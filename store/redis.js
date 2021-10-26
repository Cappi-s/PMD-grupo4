const redis = require("redis");

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
}

module.exports = RedisStore