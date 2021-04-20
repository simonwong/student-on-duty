import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: [],
})

export const dutyState = atom({
  key: 'dutyState',
  default: [],
})
