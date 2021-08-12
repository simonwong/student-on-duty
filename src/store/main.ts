import { selector } from 'recoil'
import { DataList, PersonList } from '@/typings/data.d'

import { userState, dutyState } from './global'

export const personMapState = selector({
  key: 'personMapState',
  get: ({ get }) => {
    const users = get(userState)
    const duties = get(dutyState)

    const obj = {}
    ;(users as PersonList).forEach(({ id, name, deleted }) => {
      obj[id] = {
        name,
        times: 0,
        joinTimes: 0,
        rate: 0,
        rateArr: [],
        rankArr: [],
        deleted,
      }
    })
    ;(duties as DataList).forEach(item => {
      item.onDuty.forEach(id => {
        obj[id].times += 1
        obj[id].rateArr.push(item.onDuty.length / item.gammer.length)
        obj[id].rankArr.push(item.gammer.length) // 这里暂时把参与人数当成权重值
      })
      item.gammer.forEach(id => {
        obj[id].joinTimes += 1
        if (!item.onDuty.includes(id)) {
          obj[id].rateArr.push(0)
          obj[id].rankArr.push(item.gammer.length > 5 ? -1 : -2)
        }
      })
    })
    return obj
  },
})

// 场次胜率统计
const calculateTimesRate = item =>
  ((item.times / item.joinTimes) * 100).toFixed(2)

// 个人平均胜率统计
const calculateAverageRate = item =>
  (
    (item.rateArr.reduce((pre, next) => pre + next, 0) / item.rateArr.length) *
    100
  ).toFixed(2)

export const comprehensiveDataSate = selector({
  key: 'comprehensiveDataSate',
  get: ({ get }) => {
    const personMap = get(personMapState)
    let maxRate = 20
    const comprehensiveData = Object.keys(personMap)
      .filter(id => !personMap[id].deleted)
      .map(id => {
        const timesRate = calculateTimesRate(personMap[id])
        const averageRate = calculateAverageRate(personMap[id])

        maxRate = Math.max(
          maxRate,
          Math.ceil(Number(timesRate)),
          Math.ceil(Number(averageRate)),
        )

        return {
          // 胜利次数
          times: personMap[id].times,
          // 场次胜率
          timesRate,
          // 平均胜率
          averageRate,
          name: personMap[id].name,
        }
      })
      .sort((a, b) => {
        if (a.times !== b.times) {
          return b.times - a.times
        }
        if (a.timesRate !== b.timesRate) {
          return Number(b.timesRate) - Number(a.timesRate)
        }
        return Number(b.averageRate) - Number(a.averageRate)
      })

    return {
      title: '综合数据',
      data: comprehensiveData,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          data: ['胜利次数', '场次胜率', '平均胜率'],
        },
        xAxis: {
          type: 'category',
          data: comprehensiveData.map(item => item.name),
          axisPointer: {
            type: 'shadow',
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '次数',
            min: 0,
            max: comprehensiveData[0]?.times || 50,
            interval: 5,
            axisLabel: {
              formatter: '{value} 次',
            },
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: maxRate,
            interval: 20,
            axisLabel: {
              formatter: '{value} %',
            },
          },
        ],
        series: [
          {
            name: '胜利次数',
            type: 'bar',
            data: comprehensiveData.map(item => item.times),
          },
          {
            name: '场次胜率',
            type: 'line',
            yAxisIndex: 1,
            data: comprehensiveData.map(item => item.timesRate),
          },
          {
            name: '平均胜率',
            type: 'line',
            yAxisIndex: 1,
            data: comprehensiveData.map(item => item.averageRate),
          },
        ],
      },
    }
  },
})

export const personRankDataState = selector({
  key: 'personRankDataState',
  get: ({ get }) => {
    const personMap = get(personMapState)
    const personRankData = Object.keys(personMap)
      .map(id => ({
        value: personMap[id].rankArr.reduce((pre, next) => pre + next, 0),
        name: personMap[id].name,
      }))
      .sort((a, b) => a.value - b.value)

    return {
      title: '个人实力段位',
      data: personRankData,
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          top: 'bottom',
        },
        series: [
          {
            name: '个人实力段位',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: personRankData,
          },
        ],
      },
    }
  },
})
