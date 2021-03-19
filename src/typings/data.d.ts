type PersonItem = {
  name: string
  id: number
}

export type PersonList = PersonItem[]

type DataItem = {
  gammer: number[]
  onDuty: number[]
  createDate: string
}

export type DataList = DataItem[]

interface PersonMapData {
  [id as string]: {
    name: string
    times: number
    joinTimes: number
    rate: number
  }
}
