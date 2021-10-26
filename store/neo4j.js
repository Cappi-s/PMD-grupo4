const neo4j = require('neo4j-driver');

class Neo4jStore {
    constructor() {
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

        this._client = client
    }

    doSomething() {
        // this._client.run()
    }
}

module.exports = Neo4jStore