import React, { useMemo } from 'react'
import { Star } from '@material-ui/icons'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'

const Record = ({ users, duties }) => {
  const reversedData = useMemo(() => [...duties].reverse(), [duties])

  const personObj = useMemo(
    () =>
      users.reduce(
        (preObj, nextItem) => ({
          ...preObj,
          [nextItem.id]: nextItem.name,
        }),
        {},
      ),
    [users],
  )
  const columns = [
    { field: 'createDate', width: 200, headerName: '日期' },
    {
      field: 'onDuty',
      width: 200,
      headerName: '值日生',
      valueFormatter: ({ value }) => (
        <div>
          {value.map((id: number) => (
            <Chip
              key={id}
              style={{ marginRight: 5 }}
              label={personObj[id]}
              color="primary"
              variant="outlined"
              icon={<Star />}
            />
          ))}
        </div>
      ),
    },
    {
      field: 'gammer',
      flex: 1,
      headerName: '参与人员',
      valueFormatter: ({ value }) => (
        <div>
          {value.map((id: number) => (
            <Chip
              key={id}
              style={{ marginRight: 5 }}
              label={personObj[id]}
              variant="outlined"
            />
          ))}
        </div>
      ),
    },
  ]

  return (
    <div style={{ height: 500 }}>
      <h2>值日生记录</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reversedData.map(row => (
              <TableRow key={row.createDate}>
                {columns.map(col => (
                  <TableCell key={col.field}>
                    {col.valueFormatter
                      ? col.valueFormatter({ value: row[col.field] })
                      : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Record
