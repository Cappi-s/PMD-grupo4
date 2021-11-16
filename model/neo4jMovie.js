class Neo4jMovie {
    constructor(id, title, year){
        this.id = id
        this.title = title 
        this.year = year 
    }

    static FromJSON(...jsonMovies) {
        let movies = []
        jsonMovies.forEach(movie => {
            let year = ""
            if (movie.release_date) {
                year = movie.release_date.split('-')[0]
            }
    
            movies.push(new Neo4jMovie(
                movie.id,
                movie.original_title, 
                year, 
            ))
        })
        
        if (movies.length === 1) {
            return movies[0]
        }
        return movies
    }
}

module.exports = Neo4jMovie