import { Link } from "react-router"

function Pokemons({id, name, image, types, hp, attack, weight}){
    return (
        <li className={`main-list row-${types[0]}`}>
            <Link to={`/pokemonDetails/${id}`} className="pokemon-link">
                <img className="icons" src={image} alt={`Sprite for ${name}`}/>
                <span className="pokemon-name">{name}</span>

                <span className="pokemon-type">
                    {types.map(type => (
                        <span key={type} className={`badge badge-${type}`}>
                            {type}
                        </span>
                    ))}
                </span>

                <span className="pokemon-stats">
                    HP: {hp} · ATK: {attack} · WT:{weight/10} kg
                </span>
            </Link>
        </li>
    )
}

export default Pokemons
