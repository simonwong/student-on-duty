import React, { useMemo } from 'react'
import { TableContainer, Paper } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import Layout from '@/components/Layout'
import { isSameMonth } from 'date-fns'

import { personObjState, reversedDataState } from '@/store/record'
import { personMapState } from '@/store/main'
import Student from '@/components/Student'

function StarPage() {
  const personObj = useRecoilValue(personObjState)
  const personMap = useRecoilValue(personMapState)
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

    currentMonthData.forEach(({ onDuty, initiative }) => {
      onDuty.forEach(personId => {
        personTimeObj[personId] = personTimeObj[personId]
          ? personTimeObj[personId] + 1
          : 1
      })
      initiative?.forEach(personId => {
        personTimeObj[personId] = personTimeObj[personId]
          ? personTimeObj[personId] + 1
          : 1
      })
    })

    let first = []
    let firstNum = 0
    let second = []
    const last = Object.keys(personMap).filter(
      key => !personTimeObj[key] && !personMap[key].deleted,
    )

    Object.entries(personTimeObj).forEach(([personId, times]) => {
      if (firstNum > times) {
        second.push({ personId, times })
      } else if (firstNum === times) {
        first.push({ personId, times })
      } else {
        second = second.concat(first)
        first = [{ personId, times }]
        firstNum = times
      }
    })

    second = second.sort(({ times: pre }, { times: next }) => next - pre)

    return {
      first,
      second,
      last,
    }
  }, [currentMonthData, personMap])

  const leiFenData = useMemo(() => {
    const leifFen: {
      [personId: string]: number
    } = {}

    currentMonthData.forEach(({ initiative }) => {
      initiative?.forEach(personId => {
        leifFen[personId] = leifFen[personId] ? leifFen[personId] + 1 : 1
      })
    })

    return leifFen
  }, [currentMonthData])

  return (
    <Layout>
      <div className="flex items-center">
        <h2 className="mr-4">本月之星</h2>
      </div>
      <TableContainer className="p-4" component={Paper}>
        <div className="mb-4 flex">
          {starData?.first?.map(({ personId, times }) => (
            <div className="mr-3">
              <Student isStar id={personId} />
              <span className="text-lg ml-1 h-10 inline-block">
                {times} 次
                {leiFenData[personId] && (
                  <>
                    （雷锋：
                    {leiFenData[personId]}次）
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </TableContainer>
      <div className="flex items-center">
        <h2 className="mr-4">还需努力</h2>
      </div>
      <TableContainer className="p-4" component={Paper}>
        {starData?.second?.map(({ personId, times }) => (
          <div className="mb-2">
            {personObj[personId]} {times} 次
            {leiFenData[personId] && (
              <>
                （雷锋：
                {leiFenData[personId]}次）
              </>
            )}
          </div>
        ))}
      </TableContainer>
      <div className="flex items-center">
        <h2 className="mr-4">真是怠惰</h2>
      </div>
      <TableContainer className="p-4" component={Paper}>
        {starData?.last?.map(personId => (
          <div className="mb-2">{personObj[personId]}</div>
        ))}
      </TableContainer>
    </Layout>
  )
}

export default StarPage
