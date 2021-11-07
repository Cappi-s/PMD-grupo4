require("dotenv").config();

const TMDBStore = require("./store/tmdb");
const RedisStore = require("./store/redis");
const Neo4jStore = require("./store/neo4j");
const BannedWordsStore = require("./store/bannedwords");

const RedisMovie = require("./model/redisMovie");
const Neo4jMovie = require("./model/neo4jMovie");

async function main() {
  try {
    tmdbStore = new TMDBStore();
    bannedWordsStore = new BannedWordsStore();
    redisStore = new RedisStore();
    neo4jStore = new Neo4jStore();

    let jsonMovies = await tmdbStore.GetMovies();
    console.log("json movie quant", jsonMovies.length)
    jsonMovies = await bannedWordsStore.FilterMovies(...jsonMovies);
    console.log("filtered", jsonMovies.length)

    console.log("Getting reviews...");
    for (const movie of jsonMovies) {
      const movieReviews = await tmdbStore.GetReviewsByMovieId(movie.id);
      movie.reviews = movieReviews;
    }
    console.log("Done.\n#");

    let redisMovies = RedisMovie.FromJSON(...jsonMovies);

    await redisStore.setMovies(...redisMovies);

    let neo4jMovies = Neo4jMovie.FromJSON(...jsonMovies);

    neo4jStore.InsertMany(...neo4jMovies);

    console.log("Inserting movies cast...");
    let i = 0;
    for (const movie of neo4jMovies) {
      i++;
      console.log(`${i}/${neo4jMovies.length}`);

      cast = await tmdbStore.GetCastByMovieId(movie.id);
      await neo4jStore.InsertMovieCast(movie.id, cast);
    }
    console.log("Done.\n#");

    console.log("Ready to go :)");
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
