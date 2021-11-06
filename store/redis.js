const redis = require("async-redis");

class RedisStore {
    constructor(){
        const client = redis.createClient();
        client.on("error", function(error) {
            console.error(error);
        });

        this._client = client
    }

    doSomething(){
        //this._client.get()
    }

    async setMovies(...movies) {
        console.log('Saving movies on Redis')
        for(const movie of movies) {
            await this._client.set(movie.id, JSON.stringify(movie))
        }
    }

    async getMovieByID(id) {
        const movieString = await this._client.get(id)
        return JSON.parse(movieString)
    }
}

module.exports = RedisStore