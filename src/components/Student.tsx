import React from 'react'
import { Fab } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { studentMapState } from '@/store/global'

interface StudentProps {
  className?: string
  id: string | number
  color?: 'inherit' | 'default' | 'primary' | 'secondary'
}

const Student: React.FC<StudentProps> = ({ className, color, id }) => {
  const studentMap = useRecoilValue(studentMapState)

  if (!studentMap[id]) {
    return null
  }
  return (
    <Fab color={color} size="medium" variant="extended" className={className}>
      {studentMap[id]}
    </Fab>
  )
}

export default Student
