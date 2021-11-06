const neo4j = require("neo4j-driver");
const Neo4jPerson = require("../model/neo4jPerson");

class Neo4jStore {
  constructor() {
    const client = neo4j.driver(
      process.env.NEO4J_HOST,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
    );

    this._client = client;
  }

  InsertMany(...neo4jMovies) {
    console.log("Inserting movies in Neo4j...");
    neo4jMovies.forEach(async (movie) => {
      try {
        let session = this._client.session({
          database: process.env.NEO4J_DATABASE,
          defaultAccessMode: neo4j.session.WRITE,
        });

        await session.run(
          `MERGE (m:Movie {id: $id, title: $title, year: $year})`,
          { id: movie.id, title: movie.title, year: movie.year }
        );
      } catch (error) {
        console.log("Error inserting: ", error);
      }
    });

    console.log("Done.\n#");
  }

  InsertMovieCast(movieId, cast) {
    return new Promise(async (resolve, reject) => {
      for (let jsonPerson of cast.cast) {
        try {
          let session = this._client.session({
            database: process.env.NEO4J_DATABASE,
            defaultAccessMode: neo4j.session.WRITE,
          });

          let person = Neo4jPerson.FromJSON(jsonPerson);

          await session.run(
            `MERGE (p:Person {id: $personId, name: $personName});`,
            { personId: person.id, personName: person.name }
          );

          let char = "";
          if (jsonPerson.character) {
            char = jsonPerson.character;
          }
          await session.run(
            `MATCH(p:Person {id: $personId}), (m:Movie {id: $movieId}) MERGE (p)-[:ACTING {role: $personRole}]-(m);`,
            { personId: person.id, movieId: movieId, personRole: char }
          );
        } catch (error) {
          console.log("Error inserting: ", error);
          reject();
        }
      }

      for (let jsonPerson of cast.crew) {
        try {
          let session = this._client.session({
            database: process.env.NEO4J_DATABASE,
            defaultAccessMode: neo4j.session.WRITE,
          });

          let person = Neo4jPerson.FromJSON(jsonPerson);

          await session.run(
            `MERGE (p:Person {id: $personId, name: $personName});`,
            { personId: person.id, personName: person.name }
          );

          let job = "";
          if (jsonPerson.job) {
            job = jsonPerson.job;
          }
          let department = "CREW";
          if (jsonPerson.department) {
            department = jsonPerson.department
              .toUpperCase()
              .replace("&", "")
              .replace("-", "")
              .split(" ")
              .join("_");
          }

          await session.run(
            `MATCH(p:Person {id: $personId}), (m:Movie {id: $movieId}) MERGE (p)-[:${department} {role: $personRole}]-(m);`,
            { personId: person.id, movieId: movieId, personRole: job }
          );
        } catch (error) {
          console.log("Error inserting: ", error);
          reject();
        }
      }
      resolve();
    });
  }
}

module.exports = Neo4jStore;
