import React from 'react'
import { Alert } from 'reactstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)


  if (notifications === null) {
    return null
  }

  return (
    <Alert className="mb-0" color={notifications.status === 'success' ? 'success' : 'danger'}>
      {notifications.msg}
    </Alert>
  )
}

export default Notification
