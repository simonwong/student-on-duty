import { selector } from 'recoil'
import { userState, dutyState } from './global'

export const personObjState = selector({
  key: 'personObjState',
  get: ({ get }) => {
    const users = get(userState)

    return users.reduce(
      (preObj, nextItem) => ({
        ...preObj,
        [nextItem.id]: nextItem.name,
      }),
      {},
    )
  },
})

export const reversedDataState = selector({
  key: 'reversedDataState',
  get: ({ get }) => {
    const duties = get(dutyState)
    return [...duties].reverse()
  },
})
