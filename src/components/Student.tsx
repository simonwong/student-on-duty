import React from 'react'
import { Fab } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { studentMapState } from '@/store/global'

interface StudentProps {
  className?: string
  id: string | number
  isStar?: boolean
}

const Student: React.FC<StudentProps> = ({ className, isStar, id }) => {
  const studentMap = useRecoilValue(studentMapState)

  const color = isStar ? 'secondary' : 'primary'
  const blink = isStar

  if (!studentMap[id]) {
    return null
  }
  return (
    <Fab
      color={color}
      size="medium"
      variant="extended"
      className={`${blink ? 'blink' : ''} ${className}`}
    >
      {studentMap[id]}
    </Fab>
  )
}

export default Student
