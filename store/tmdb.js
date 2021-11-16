const axios = require("axios").default;

const requestConfig = {
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.API_KEY,
    include_adult: false,
  },
};

const pagesToFetch = process.env.PAGES_TO_FETCH;

class TMDBStore {
  constructor() {}

  GetMovies() {
    return new Promise(async (resolve, _) => {
      console.log("Fetching movies...");

      let movies = [];

      for (let i = 1; i <= pagesToFetch; i++) {
        if (i % 10 == 0) {
          console.log(`${i}/${pagesToFetch} pages fetched`);
        }

        let m = await this._getMoviesByPage(i);
        movies.push(...m);
      }
      console.log("Done.\n#");
      resolve(movies);
    });
  }

  _getMoviesByPage(page) {
    return new Promise((resolve, reject) => {
      axios
        .get("/discover/movie?page=" + page, requestConfig)
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  GetReviewsByMovieId(movieId) {
    return new Promise((resolve, reject) => {
      axios
        .get("/movie/" + movieId + "/reviews", requestConfig)
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  GetCastByMovieId(movieId) {
    return new Promise((resolve, reject) => {
      axios
        .get("/movie/" + movieId + "/credits", requestConfig)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = TMDBStore;
