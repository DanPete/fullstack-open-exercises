import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  }

  return (
    <div className={successMessage ? 'success' : 'error'}>
      {errorMessage || successMessage}
    </div>
  )
}

export default Notification
