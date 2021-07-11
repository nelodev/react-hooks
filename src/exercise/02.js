// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(data) {
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(data.name) || data.value,
  )
  React.useEffect(() => {
    window.localStorage.setItem(data.name, value)
  }, [data, value])

  return [value, setValue]
}

function Greeting({initialName = '', initialAge = 25}) {
  const [name, setName] = useLocalStorageState({
    name: 'initialName',
    value: initialName,
  })
  const [age, setAge] = useLocalStorageState({
    name: 'age',
    value: initialAge,
  })
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') || initialName,
  // )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  function handleAgeChange(event) {
    setAge(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        <label htmlFor="age">Age: </label>
        <input value={age} onChange={handleAgeChange} id="age" />
      </form>
      {name ? (
        <strong>
          Hello {name}, happy {age} years
        </strong>
      ) : (
        'Please type your name'
      )}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
