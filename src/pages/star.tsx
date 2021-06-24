import React, { useMemo } from 'react'
import { TableContainer, Paper } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import Layout from '@/components/Layout'
import { isSameMonth } from 'date-fns'

import { personObjState, reversedDataState } from '@/store/record'

function StarPage() {
  const personObj = useRecoilValue(personObjState)
  const reversedData = useRecoilValue(reversedDataState)

  const currentMonthData = useMemo(
    () =>
      reversedData.filter(item =>
        isSameMonth(new Date(item.createDate), new Date()),
      ),
    [reversedData],
  )

  const starData = useMemo(() => {
    const personTimeObj: {
      [personId: string]: number
    } = {}

    currentMonthData.forEach(({ onDuty }) => {
      onDuty.forEach(personId => {
        personTimeObj[personId] = personTimeObj[personId]
          ? personTimeObj[personId] + 1
          : 1
      })
    })

    let first = []
    let firstNum = 0
    const second = []

    Object.entries(personTimeObj).forEach(([personId, times]) => {
      if (firstNum > times) {
        second.push({ personId, times })
      } else if (firstNum === times) {
        first.push({ personId, times })
      } else {
        first = [{ personId, times }]
        firstNum = times
      }
    })

    return {
      first,
      second,
    }
  }, [currentMonthData])

  return (
    <Layout>
      <div className="flex items-center">
        <h2 className="mr-4">本月之星</h2>
      </div>
      <TableContainer className="p-4" component={Paper}>
        <div className="mb-4 flex">
          {starData?.first?.map(({ personId, times }) => (
            <div className="mr-2">
              {personObj[personId]} {times} 次
            </div>
          ))}
        </div>
        {starData?.second?.map(({ personId, times }) => (
          <div className="mb-2">
            {personObj[personId]} {times} 次
          </div>
        ))}
      </TableContainer>
    </Layout>
  )
}

export default StarPage
