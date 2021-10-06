require('dotenv').config()

const redis = require("redis");
const neo4j = require('neo4j-driver');
const axios = require('axios');

function API_URL(path) {
    return `https://api.themoviedb.org/3${path}?api_key=${process.env.API_KEY}`
}

function setupRedis() {
    const client = redis.createClient();
    client.on("error", function(error) {
        console.error(error);
    });

    return client
}

function setupNeo4j() {
    const driver = neo4j.driver(
        process.env.NEO4J_HOST,
        neo4j.auth.basic(
            process.env.NEO4J_USER, 
            process.env.NEO4J_PASSWORD
        )
    )

    const client = driver.session({
        database: process.env.NEO4J_DATABASE,
        defaultAccessMode: neo4j.session.WRITE
    })

    return client
}

async function main() {
    redisClient = setupRedis()
    neo4jClient = setupNeo4j()

    res = await axios.get(API_URL("/movie/550"))

    await redisClient.set(550, JSON.stringify(res.data))
    await redisClient.get(550, redis.print)

    await neo4jClient.run(
        'CREATE (m:Movie {title: $title}) RETURN m',
        { title: res.data.original_title }
    )
    res = await neo4jClient.run('MATCH (m:Movie) RETURN m',)
    const singleRecord = res.records[0]
    const node = singleRecord.get(0)
    console.log(node)
}

main()
