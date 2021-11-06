const neo4j = require('neo4j-driver');

class Neo4jStore {
    constructor() {
        const client = neo4j.driver(
            process.env.NEO4J_HOST,
            neo4j.auth.basic(
                process.env.NEO4J_USERNAME,
                process.env.NEO4J_PASSWORD
            )
        )

        this._client = client
    }

     InsertMany(...neo4jMovies) {
        console.log("Inserting movies in Neo4j...")
        neo4jMovies.forEach(async (movie) => {
           try {
                let session = this._client.session({
                    database: process.env.NEO4J_DATABASE,
                    defaultAccessMode: neo4j.session.WRITE
                })

                await session.run(
                    `MERGE (m:Movie {id: $id, title: $title, year: $year})`, 
                    {id: movie.id, title: movie.title, year: movie.year}
                )
                    
           } catch (error) {
              console.log("Error inserting: ", error)
           }
        })

        console.log('Done.\n#')
    }
}

module.exports = Neo4jStore