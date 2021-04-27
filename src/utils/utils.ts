type MaxKeyObj = {
  [key: string]: number
}
export const getMaxKeys = (data: MaxKeyObj) => {
  let res: string[] = []
  let max = 0

  Object.entries(data).forEach(([key, value]) => {
    if (value > max) {
      res = [key]
    } else if (value === max) {
      res.push(key)
    }
    max = Math.max(max, value)
  })
  return res
}
