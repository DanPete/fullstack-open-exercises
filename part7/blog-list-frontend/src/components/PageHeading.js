import React from 'react'
import { Jumbotron } from 'reactstrap'

const PageHeading = ({ content }) => {
  return (
    <Jumbotron>
      <h1 className="display-3">{content}</h1>
      <hr className="my-2"/>
    </Jumbotron>
  )
}

export default PageHeading
