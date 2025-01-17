import React, { useState } from 'react'
import {
  Switch, Route, Link, useRouteMatch, Redirect,
} from 'react-router-dom'
import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to='/' style={padding}>anecdotes</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to='/create' style={padding}>create new</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to='/about' style={padding}>about</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => <tr key={anecdote.id} >
          <td>
            <Link to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </td>
          <td>
            {anecdote.author}
          </td>
        </tr>)}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content} by {anecdote.author}</h1>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const { reset: contentReset, ...content } = useField('content')
  const { reset: authorReset, ...author } = useField('author')
  const { reset: infoReset, ...info} = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content.value} created`)
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content: </Form.Label>
          <Form.Control {...content}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>author: </Form.Label>
          <Form.Control {...author}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>info: </Form.Label>
          <Form.Control {...info}/>
          <Button variant="primary" type="submit">
            create
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset} 
            type="reset"
          >
            reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const changeNotification = (content) => {
    setNotification(content)
    setTimeout(() => {
      setNotification('')
    }, 10000);
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && 
      <Alert variant="success">
        {notification}
      </Alert>}
      <Switch>
        <Route path="/create">
          { notification 
            ? <Redirect to="/" /> 
            : <CreateNew addNew={addNew} setNotification={changeNotification} />}     
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
