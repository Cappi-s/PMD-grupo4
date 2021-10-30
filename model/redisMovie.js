class RedisMovie {
<<<<<<< HEAD
    constructor(title, description, year, averageRate, lastReviews) {
        this.title = title
        this.description = description
        this.year = year
        this.averageRate = averageRate
        this.lastReviews = lastReviews
=======
    constructor(id, title, description, year, averageRate){
        this.id = id
        this.title = title 
        this.description = description 
        this.year = year 
        this.averageRate = averageRate 
        this.lastReviews = []
>>>>>>> 4205705d3c54c5b50a38b1e72ad75fd45cb447d1
    }

    static FromJSON(...jsonMovies) {
        let movies = []
        jsonMovies.forEach(movie => {
            let year = movie.release_date.split('-')[0]
            let averageRate = RedisMovie._transformRate(movie.vote_average)
            let lastReviews = RedisMovie._reduceReview(...movie.reviews)

            movies.push(new RedisMovie(
<<<<<<< HEAD
                movie.original_title,
                movie.overview,
                year,
                averageRate,
                lastReviews
=======
                movie.id,
                movie.original_title, 
                movie.overview, 
                year, 
                averageRate
>>>>>>> 4205705d3c54c5b50a38b1e72ad75fd45cb447d1
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

    static _reduceReview(...reviews) {
        let reducedReviews = []
        reviews.forEach(review => {
            reducedReviews.push({
                author: review.author,
                content: review.content
            })
        })
        return reducedReviews
    }
}

module.exports = RedisMovie