import React, { useMemo, useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { ButtonGroup, Button } from '@material-ui/core'
import { DataList, PersonList } from '@/typings/data.d'

function HomePage({ users, duties }) {
  const [type, setType] = useState('times')
  // 人物数据
  const personMap = useMemo(() => {
    const obj = {}
    ;(users as PersonList).forEach(({ id, name }) => {
      obj[id] = {
        name,
        times: 0,
        joinTimes: 0,
        rate: 0,
        rateArr: [],
        rankArr: [],
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
  }, [users, duties])

  // console.log('personMap', personMap)

  // 数据统计
  const stateMap = useMemo(() => {
    // 胜利次数统计
    const timesData = Object.keys(personMap).map(id => ({
      value: personMap[id].times,
      name: personMap[id].name,
    }))

    // 胜利次数统计
    const sessionWinData = Object.keys(personMap).map(id => ({
      value: personMap[id].times / personMap[id].joinTimes,
      name: personMap[id].name,
    }))

    const personWinData = Object.keys(personMap).map(id => ({
      value:
        personMap[id].rateArr.reduce((pre, next) => pre + next, 0) /
        personMap[id].rateArr.length,
      name: personMap[id].name,
    }))

    const personRankData = Object.keys(personMap).map(id => ({
      value: personMap[id].rankArr.reduce((pre, next) => pre + next, 0),
      name: personMap[id].name,
    }))

    return {
      times: {
        title: '胜利次数统计',
        data: timesData,
      },
      sessionWin: {
        title: '场次胜率统计',
        data: sessionWinData,
      },
      personWin: {
        title: '个人平均胜率统计',
        data: personWinData,
      },
      personRank: {
        title: '个人实力段位',
        data: personRankData,
      },
    }
  }, [personMap])

  useEffect(() => {
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        top: 'bottom',
      },
      series: [
        {
          name: '值日生胜利分布图',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: stateMap[type].data,
        },
      ],
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option)
  }, [personMap, stateMap, type])

  // const sortedData = data.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))

  // sortedData.forEach(item => {
  //   console.log(item.onDuty.map(id => personMap[id]).join(','), item.createDate)
  // })

  return (
    <div>
      <h2>{stateMap[type].title}</h2>
      <ButtonGroup color="secondary">
        {Object.keys(stateMap).map(key => (
          <Button
            type="button"
            key={key}
            onClick={() => {
              setType(key)
            }}
          >
            {stateMap[key].title}
          </Button>
        ))}
      </ButtonGroup>
      <div style={{ width: '80vw', height: '70vh' }} id="main" />
    </div>
  )
}

export default HomePage
