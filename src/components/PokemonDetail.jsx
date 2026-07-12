import { useEffect, useState } from "react"
import { useFetcher, useParams } from "react-router"

function PokemonDetail() {
    const {id} = useParams()
    const [fullDetails, setFullDetails] = useState(null)

    useEffect(() => {
        const fetchPokemonDetails = async() => {
            const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const detailJson = await detailResponse.json()

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            const speciesJson = await speciesResponse.json()

            const flavorEntry = speciesJson.flavor_text_entries.find(
                entry => entry.language.name === "en"
            )

            setFullDetails({
                id: detailJson.id,
                name: detailJson.name,
                image: detailJson.sprites.other["official-artwork"].front_default,
                types: detailJson.types.map(t => t.type.name),
                height: detailJson.height,
                weight: detailJson.weight,
                abilities: detailJson.abilities.map(a => a.ability.name),
                stats: detailJson.stats.map(s => ({
                    name: s.stat.name,
                    value: s.base_stat
                })),
                flavorText: flavorEntry ? flavorEntry.flavor_text.replace(/\f/g, " ") : "No description is available at the moment.",
                habitat: speciesJson.habitat ? speciesJson.habitat.name : "Unknown",
                captureRate: speciesJson.capture_rate,
                eggGroups: speciesJson.egg_groups.map(group => group.name)
            })
        }

        fetchPokemonDetails().catch(console.error)
    }, [id])

    return (
        <div className="detail-page">
            {fullDetails ? (
                <div>
                    <div className="detail-header">
                        <img className="detail-image" src={fullDetails.image} alt={`Artwork for ${fullDetails.name}`}/>
                        <h1 className="detail-name">{fullDetails.name}</h1>
                        <div className="detail-types">
                            {fullDetails.types.map(type => (
                                <span key={type} className={`badge badge-${type}`}>
                                    {type}
                                </span>
                            ))}
                        </div>
                        <p className="detail-flavor">{fullDetails.flavorText}</p>
                    </div>

                    <table className="detail-table">
                        <tbody>
                            <tr>
                                <td>Height</td>
                                <td>{fullDetails.height / 10} m</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{fullDetails.weight /10} kg</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td>{fullDetails.abilities.join(", ")}</td>
                            </tr>
                            <tr>
                                <td>Habitat</td>
                                <td>{fullDetails.habitat}</td>
                            </tr>
                            <tr>
                                <td>Capture Rate</td>
                                <td>{fullDetails.captureRate}</td>
                            </tr>
                            <tr>
                                <td>Egg Groups</td>
                                <td>{fullDetails.eggGroups.join(", ")}</td>
                            </tr>
                            {fullDetails.stats.map(stat => (
                                <tr key={stat.name}>
                                    <td>{stat.name}</td>
                                    <td>{stat.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="status-msg">Loading Pokémon details...</p>
            )}
        </div>
    )
}

export default PokemonDetail