import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Message({ msg, onClose }) {
  console.log(`msg`, msg)
  return (
    <Snackbar open={!!msg} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {msg}
      </Alert>
    </Snackbar>
  )
}

export default Message
