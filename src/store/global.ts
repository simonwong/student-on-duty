import { atom, selector } from 'recoil'
import { getMaxKeys } from '@/utils/utils'

export const userState = atom({
  key: 'userState',
  default: [],
})

export const dutyState = atom({
  key: 'dutyState',
  default: [],
})

export const studentMapState = selector({
  key: 'studentMapState',
  get: ({ get }) => {
    const users = get(userState)

    const personMap = {}
    users.forEach(({ id, name }) => {
      personMap[id] = name
    })
    return personMap
  },
})

export const bestBrotherState = selector({
  key: 'bestBrotherState',
  get: ({ get }) => {
    const duties = get(dutyState)
    const timesDataMap = {}
    duties.forEach(item => {
      const dutyStr = [...item.onDuty].sort().join(',')

      timesDataMap[dutyStr] = timesDataMap[dutyStr]
        ? timesDataMap[dutyStr] + 1
        : 1
    })

    return getMaxKeys(timesDataMap).map(item => ({
      name: item.split(','),
      times: timesDataMap[item],
    }))
  },
})
