import React, { useState } from 'react'
import { Face, Done } from '@material-ui/icons'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Message from './Message'

const initialJoins = users => {
  const ans = {}
  users.forEach(user => {
    ans[user.id] = user.name
  })
  return ans
}

function NewDutiesDialog({ users, open, onClose }) {
  const [joinMap, setJoinMap] = useState(initialJoins(users))
  const [date, setDate] = useState(new Date())
  const [duties, setDuties] = useState([])
  const [alertMsg, setAlertMsg] = useState(null)

  const handleDelete = user => {
    const newJoinMap = { ...joinMap }
    delete newJoinMap[user.id]
    setJoinMap(newJoinMap)
  }

  const handleClick = user => {
    const newJoinMap = { ...joinMap }

    if (newJoinMap[user.id] != null) {
      delete newJoinMap[user.id]
    } else {
      newJoinMap[user.id] = user.name
    }
    setJoinMap(newJoinMap)
  }

  const handleChangeDate = value => {
    setDate(value)
  }

  const handleChangeDuties = e => {
    const { value } = e.target
    if (value.length > 2) {
      setAlertMsg('只能有两名最佳选手啊')
      return
    }
    setDuties(value)
  }

  const handleCloseMsg = () => {
    setAlertMsg(null)
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">最佳选手名单</DialogTitle>
      <DialogContent>
        <DialogContentText>
          请移除未参与的人员，并选择其中的最佳选手
        </DialogContentText>
        <Paper
          component="ul"
          className="list-none p-4 flex flex-wrap"
          style={{ width: 600 }}
        >
          {users.map(user => {
            const isSelected = joinMap[user.id] != null

            return (
              <li className="mb-2 mr-2" key={user.id}>
                <Chip
                  color={isSelected ? 'primary' : undefined}
                  label={user.name}
                  icon={isSelected ? <Face /> : undefined}
                  deleteIcon={<Done />}
                  clickable
                  onDelete={isSelected ? () => handleDelete(user) : undefined}
                  onClick={() => handleClick(user)}
                />
              </li>
            )
          })}
        </Paper>
        <FormControl className="w-full">
          <InputLabel id="duty-users">获胜选手</InputLabel>
          <Select
            labelId="duty-users"
            multiple
            value={duties}
            onChange={handleChangeDuties}
          >
            {Object.keys(joinMap).map(key => (
              <MenuItem key={key} value={key}>
                {joinMap[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className="w-full"
            margin="normal"
            label="获胜日期"
            format="yyyy-MM-dd"
            value={date}
            onChange={handleChangeDate}
            KeyboardButtonProps={{
              'aria-label': '更改日期',
            }}
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <Message msg={alertMsg} onClose={handleCloseMsg} />
      <DialogActions>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
        <Button onClick={onClose} color="primary">
          提交
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewDutiesDialog
