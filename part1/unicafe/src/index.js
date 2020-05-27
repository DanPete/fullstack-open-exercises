import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const score = (good * 1) + (bad * -1)

  const average = (score / all).toFixed(2)
  const positive = (good / all * 100).toFixed(2) + "%"

  return (
    <table>
      <tbody>
        <Stat text="good" data={good} />
        <Stat text="neutral" data={neutral} />
        <Stat text="bad" data={bad} />
        <Stat text="all" data={all} />
        <Stat text="average" data={average} />
        <Stat text="positive" data={positive} />
      </tbody>
    </table>
  )
}

const Stat = ({text, data}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{data}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (feedback) => () => {
    switch (feedback) {
      case 'good':
        setGood(good + 1)
        break;
      case 'neutral':
        setNeutral(neutral + 1)
        break;
      case 'bad':
        setBad(bad + 1)
        break;
    
      default:
        console.log('err')
        break;
    }
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={handleFeedback('good')}/>
      <Button text="neutral" handleClick={handleFeedback('neutral')}/>
      <Button text="bad" handleClick={handleFeedback('bad')}/>
      <Header text="statistics" />
      {good + neutral + bad !== 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
