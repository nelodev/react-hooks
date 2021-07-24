// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = React.useState({status: 'idle', pokemon: null})

  React.useEffect(() => {
    if (pokemonName === '') return
    setStatus({status: 'pending', pokemon: null})
    fetchPokemon(pokemonName)
      .then(pokemonData =>
        setStatus({status: 'resolved', pokemon: pokemonData}),
      )
      .catch(error => setStatus({status: 'rejected', pokemon: null, error}))
  }, [pokemonName])

  if (status.status === 'rejected') throw status.error
  if (status.status === 'idle') return 'Submit a pokemon'
  if (status.status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  if (status.status === 'resolved')
    return <PokemonDataView pokemon={status.pokemon} />
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          key={pokemonName}
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
