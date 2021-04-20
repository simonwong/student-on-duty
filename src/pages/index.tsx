import React, { useState, useEffect, useMemo } from 'react'
import * as echarts from 'echarts'
import { ButtonGroup, Button } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { comprehensiveDataSate, personRankDataState } from '@/store/main'

import Layout from '@/components/Layout'

function HomePage() {
  const [type, setType] = useState('comprehensiveRank')
  const comprehensiveData = useRecoilValue(comprehensiveDataSate)
  const personRankData = useRecoilValue(personRankDataState)

  const stateMap = useMemo(
    () => ({
      comprehensiveRank: comprehensiveData,
      personRank: personRankData,
    }),
    [comprehensiveData, personRankData],
  )

  useEffect(() => {
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
    const { option: customOption } = stateMap[type]

    myChart.setOption(customOption, true)
  }, [stateMap, type])

  return (
    <Layout>
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
      <div className="w-full" style={{ height: '75vh' }} id="main" />
    </Layout>
  )
}

export default HomePage
