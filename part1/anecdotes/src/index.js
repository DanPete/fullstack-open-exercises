import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Anecdote = ({ points, selected}) => {
  return (
    <>
      <h3>{anecdotes[selected]}</h3>
      <Votes points={points} selected={selected} />
    </>
  )

}

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Votes = ({ points, selected }) => {
  return (
    <p>has {points[selected] || 0} votes</p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})

  const handleRandom = () => {
    let randomEle = selected
    while (selected === randomEle) {
      randomEle = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomEle)
  }

  const incrementVote = () => {
    const selectedVote = points[selected] || 0
    setPoints({...points, [selected]: selectedVote + 1})
  }

  const mostVotes = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b, 0)
  console.log(mostVotes)

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote points={points} selected={selected}/>
      <Button text="vote" handleClick={incrementVote}/>
      <Button text="next anecdote" handleClick={handleRandom}/>
      <Heading text="Anecdote with the most votes" />
      {Object.entries(points).length ? (
        <Anecdote points={points} selected={mostVotes} />
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)