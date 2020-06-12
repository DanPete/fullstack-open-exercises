import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button color="primary" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <Button className="mt-2" onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
