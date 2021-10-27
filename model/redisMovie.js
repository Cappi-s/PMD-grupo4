class RedisMovie {
    constructor(title, description, year, averageRate){
        this.title = title 
        this.description = description 
        this.year = year 
        this.averageRate = averageRate 
        this.lastReviews = []
    }

    static FromJSON(...jsonMovies) {
        let movies = []
        jsonMovies.forEach(movie => {
            let year = movie.release_date.split('-')[0]
            let averageRate = RedisMovie._transformRate(movie.vote_average)
    
            movies.push(new RedisMovie(
                movie.original_title, 
                movie.overview, 
                year, 
                averageRate
            ))
        })
        
        if (movies.length === 1) {
            return movies[0]
        }
        return movies
    }

    static _transformRate(rate) {
        if (rate >= 10) return 'S'
        if (rate >= 8) return 'A'
        if (rate >= 6) return 'B'
        if (rate >= 4) return 'C'
        return 'F'
    }
}

module.exports = RedisMovie