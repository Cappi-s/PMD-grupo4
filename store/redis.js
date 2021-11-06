const redis = require("async-redis");

class RedisStore {
    constructor(){
        const client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
        client.on("error", function(error) {
            console.error(error);
        });

        this._client = client
    }

    doSomething(){
        //this._client.get()
    }

    async setMovies(...movies) {
        console.log('Saving movies in Redis...')
        for(const movie of movies) {
            await this._client.set(movie.id, JSON.stringify(movie))
        }
        console.log('Done.\n#')
    }

    async getMovieByID(id) {
        const movieString = await this._client.get(id)
        return JSON.parse(movieString)
    }
}

module.exports = RedisStore