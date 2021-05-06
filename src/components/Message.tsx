import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Message({ msg, onClose }) {
  const handelCLose = () => {
    onClose()
  }

  return (
    <Snackbar
      open={!!msg}
      message={msg}
      autoHideDuration={3000}
      onClose={handelCLose}
    >
      <Alert onClose={handelCLose} severity="error">
        {msg}
      </Alert>
    </Snackbar>
  )
}

export default React.memo(Message)
