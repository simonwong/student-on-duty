import React, { useMemo, useState } from 'react'
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
  Button,
} from '@material-ui/core'
import NewDutiesDialog from './NewDutiesDialog'

const Record = ({ users, duties }) => {
  const reversedData = useMemo(() => [...duties].reverse(), [duties])
  const [open, setOpen] = useState(false)

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

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddNewRecord = () => {
    console.log('有请下两位幸运儿')
    setOpen(true)
  }

  return (
    <div>
      <div className="flex items-center">
        <h2 className="mr-4">值日生记录</h2>
        <Button
          className="h-9"
          onClick={handleAddNewRecord}
          variant="contained"
          color="secondary"
        >
          有请下两位幸运儿
        </Button>
      </div>
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
      <NewDutiesDialog users={users} open={open} onClose={handleClose} />
    </div>
  )
}

export default Record
