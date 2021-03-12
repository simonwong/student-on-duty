import React, { useMemo, useEffect, useState } from 'react'
import * as echarts from 'echarts'
import person from './person.json'
import data from './data.json'

// interface PersonMapData {
//   [id as string]: {
//     name: string
//     times: number
//     joinTimes: number
//     rate: number
//   }
// }

function HomePage() {
  const [type, setType] = useState('times')
  // 人物数据
  const personMap = useMemo(() => {
    const obj = {}
    person.forEach(({ id, name }) => {
      obj[id] = { name, times: 0, joinTimes: 0, rate: 0, rateArr: [] }
    })
    data.forEach(item => {
      item.onDuty.forEach(id => {
        obj[id].times += 1
        obj[id].rateArr.push(item.onDuty.length / item.gammer.length)
      })
      item.gammer.forEach(id => {
        obj[id].joinTimes += 1
        if (!item.onDuty.includes(id)) {
          obj[id].rateArr.push(0)
        }
      })
    })
    return obj
  }, [])

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
    }
  }, [personMap])

  useEffect(() => {
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
    const option = {
      legend: {
        top: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
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
    // eslint-disable-next-line no-unused-expressions
    option && myChart.setOption(option)
  }, [personMap, stateMap, type])

  // const sortedData = data.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))

  // sortedData.forEach(item => {
  //   console.log(item.onDuty.map(id => personMap[id]).join(','), item.createDate)
  // })

  console.log(personMap)

  return (
    <div>
      <h1>{stateMap[type].title}</h1>
      {Object.keys(stateMap).map(key => (
        <button
          type="button"
          key={key}
          onClick={() => {
            setType(key)
          }}
        >
          {stateMap[key].title}
        </button>
      ))}
      <div style={{ width: '100%', height: '80vh' }} id="main" />
    </div>
  )
}

export default HomePage
