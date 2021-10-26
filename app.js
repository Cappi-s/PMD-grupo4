require('dotenv').config()

const TMDBStore = require('./store/tmdb')
const RedisStore = require('./store/redis')
const Neo4jStore = require('./store/neo4j')

async function main() {
    try {
        tmdbStore = new TMDBStore()
        redisStore = new RedisStore()
        neo4jStore = new Neo4jStore()

        let movies = await tmdbStore.GetMovies()
        
        // não usar os clients diretamente, só coloquei para teste
        await redisStore._client.set(551, JSON.stringify(movies))
        await redisStore._client.get(551, redisStore._client.print)

       /* await neo4jStore._client.run(
            'MERGE (:Movie {title: $title})',
            { title: movies[0].original_title }
        )*/

        for (let i = 0; i < movies.length; i++) {

            if (i%50 == 0) {
                console.log(`${i}/${movies.length} movies saved on Neo4j`)
            }

            await neo4jStore._client.run(
                'MERGE (:Movie {title: $title})',
                { title: movies[i].original_title }
            )
        }

      /*  movies.forEach(async (movie) => {
            await neo4jStore._client.run(
                'MERGE (:Movie {title: $title})',
                { title: movie.original_title }
            )
        })*/

        res = await neo4jStore._client.run('MATCH (m:Movie) RETURN m',)
        const singleRecord = res.records[0]
        const node = singleRecord.get(0)
        console.log(node)
    } catch (error) {
        console.log("Error: ", error)
    }
}

main()
