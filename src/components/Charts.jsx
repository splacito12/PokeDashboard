import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    ScatterChart, Scatter
} from "recharts"

function Charts({pokemonList}) {
    const getTypeCounts = () => {
        const counts = {}
        pokemonList.forEach(pokemon => {
            pokemon.types.forEach(type => {
                counts[type] = (counts[type] || 0) + 1
            })
        })
        return Object.entries(counts)
            .map(([type, count]) => ({type, count}))
            .sort((a, b) => b.count - a.count)
    }

    const getStatPoints = () => {
        return pokemonList.map(pokemon => ({
            name: pokemon.name,
            hp: pokemon.hp,
            attack: pokemon.attack
        }))
    }

    const typeCounts = getTypeCounts()
    const statPoints = getStatPoints()

    return (
        <div className="charts-section">
            <div className="chart-card">
                <h3>Pokémon count by type</h3>
                <ResponsiveContainer width="100%" height={420}>
                    <BarChart data={typeCounts} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 40}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis type="category" dataKey="type" width={80} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#5a79e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>HP vs Attack</h3>
                <ResponsiveContainer width="100%" height={420}>
                    <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="hp" name="HP" label={{value: "HP", position: "insideBottom", offset: -5}} />
                        <YAxis type="number" dataKey="hp" name="Attack" label={{value: "Attack", angle: -90, position: "insideLeft"}} />
                        <Tooltip
                            cursor={{strokeDasharray: "3 3"}}
                            formatter={(value, name) => [value, name]}
                            labelFormatter={() => ""}
                        />
                        <Scatter data={statPoints} fill="#f17979" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Charts