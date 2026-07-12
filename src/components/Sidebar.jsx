import {useEffect, useState} from "react"
import {Link} from "react-router"

function Sidebar() {
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        const fetchFeaturedPokemon = async () => {
            const randomIds = new Set()
            while (randomIds.size < 5) {
                randomIds.add(Math.floor(Math.random() * 151) + 1)
            }

            const details = await Promise.all(
                [...randomIds].map(async (id) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    const json = await response.json()

                    return {
                        id: json.id,
                        name: json.name,
                        image: json.sprites.front_default
                    }
                })
            )

            setFeatured(details)
        }

        fetchFeaturedPokemon().catch(console.error)
    }, [])

    return (
        <div className="sidenav">
            <h2>Featured Pokémon</h2>
            <ul className="sidenav-list">
                {featured ? (
                    featured.map(pokemon => (
                        <li key={pokemon.id}>
                            <Link to={`/pokemonDetails/${pokemon.id}`} className="sidenav-link">
                                <img src={pokemon.image} alt={`Sprite for ${pokemon.name}`} className="sidenav-icon" />
                                <span>{pokemon.name}</span>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="status-msg">Loading...</p>
                )}
            </ul>
        </div>
    )
}

export default Sidebar