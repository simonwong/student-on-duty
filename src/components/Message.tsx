import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Message({ msg, onClose }) {
  return (
    <Snackbar open={!!msg} autoHideDuration={3000} onClose={onClose}>
      <Alert severity="error">{msg}</Alert>
    </Snackbar>
  )
}

export default Message
