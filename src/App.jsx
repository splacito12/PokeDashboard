import { useState, useEffect, useMemo } from 'react'
import Pokemons from './Pokemons'
import Charts from './components/Charts'

import './App.css'

function App() {
  const [list, setList] = useState(null)
  const [search, setSearch] = useState("")
  const [filters, setFilter] = useState("ALL")

  useEffect(() => {
    const fetchAllPokemons = async () => {
      const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=250")
      const listJson = await listResponse.json()

      //fetch the full detail of the pokemon
      const pokemonDetails = await Promise.all(
        listJson.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url)
          const detailJson = await detailResponse.json()

          const hp = detailJson.stats.find(s => s.stat.name === "hp")
          const attack = detailJson.stats.find(s => s.stat.name === "attack")

          return {
            id: detailJson.id,
            name: detailJson.name,
            image: detailJson.sprites.front_default,
            types: detailJson.types.map(t => t.type.name),
            hp: hp ? hp.base_stat : 0,
            attack: attack ? attack.base_stat : 0,
            weight: detailJson.weight
          }
        })
      )
      setList(pokemonDetails)
    }

    fetchAllPokemons().catch(console.error)
  }, [])

  const searchItems = (searchValue) => {
    setSearch(searchValue)
  }

  const filterItems = (filterValue) => {
    setFilter(filterValue)
  }

  const filteredPokemons = useMemo(() => {
    if (!list){
      return []
    }

    return list
           .filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))
           .filter(pokemon => filters === "ALL" ? true : pokemon.types.includes(filters))
  },[list, search, filters])

  const getUniqueTypes = () => {
    if (!list) return []

    const allTypes = list.flatMap(pokemon => pokemon.types)
    return [...new Set(allTypes)].sort()
  }

  const getAvgAttack = useMemo(() => {
    if (filteredPokemons.length === 0){
      return 0
    }
    const totalAttack = filteredPokemons.reduce((sum, pokemon) => sum + pokemon.attack, 0)
    return (totalAttack / filteredPokemons.length).toFixed(1)
  }, [filteredPokemons])

  const getMostCommonType = useMemo(() => {
    if (filteredPokemons.length === 0) {
      return "N/A"
    }
    const typeCounts = {}
    filteredPokemons.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeCounts[type] = (typeCounts[type] || 0) + 1
      })
    })
    return Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0]
  }, [filteredPokemons])

  return (
    <div className="App">
      <h1> <img
            className="pokeball-icon"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Poké Ball"
          />
          PokéDashboard
        </h1>

      <div className="summary">
        <div className="card card1">
          <h3>Total Pokémon</h3>
          <p>{list?.length ?? "..."}</p>
        </div>
        <div className="card card2">
          <h3>Average Attack</h3>
          <p>{getAvgAttack}</p>
        </div>
        <div className="card card3">
          <h3>Most Common Type</h3>
          <p>{getMostCommonType}</p>
        </div>
      </div>

      <div className="filters">
        <input 
              type="text"
              placeholder="Search Pokémon..."
              onChange={(inputEvent) => searchItems(inputEvent.target.value)}
        />

        <select value={filters} onChange={(selectEvent) => filterItems(selectEvent.target.value)}>
          <option value="ALL">All Types</option>
          {getUniqueTypes().map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {list && <Charts pokemonList={filteredPokemons} />}

      <ul className="pokemon-list">
        {!list ? (
          <p className="status-msg">Loading Pokémon...</p>
        ) : filteredPokemons.length === 0 ? (
          <p className="status-msg">Sorry, no Pokémon found.</p>
        ) : (
          filteredPokemons.map(pokemon => (
            <Pokemons
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              hp={pokemon.hp}
              attack={pokemon.attack}
              weight={pokemon.weight}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default App
