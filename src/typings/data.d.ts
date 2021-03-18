type PersonItem = {
  name: string
  id: number
}

type PersonList = PersonItem[]

type DataItem = {
  gammer: number[]
  onDuty: number[]
  createDate: string
}

type DataList = DataItem[]

interface PersonMapData {
  [id as string]: {
    name: string
    times: number
    joinTimes: number
    rate: number
  }
}
