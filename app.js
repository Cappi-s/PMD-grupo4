require('dotenv').config()

const TMDBStore = require('./store/tmdb')
const RedisStore = require('./store/redis')
const Neo4jStore = require('./store/neo4j')
const BannedWordsStore = require('./store/bannedwords')

const RedisMovie = require('./model/redisMovie')

async function main() {
    try {
        tmdbStore = new TMDBStore()
        bannedWordsStore = new BannedWordsStore()
        redisStore = new RedisStore()
        neo4jStore = new Neo4jStore()


        let jsonMovies = await tmdbStore.GetMovies()
        jsonMovies = await bannedWordsStore.FilterMovies(...jsonMovies)
       
        let redisMovies = RedisMovie.FromJSON(...jsonMovies)
        console.log(redisMovies)

       
    } catch (error) {
        console.log("Error: ", error)
    }
}

main()
