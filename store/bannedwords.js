const axios = require('axios').default;

const URL = 'http://www.bannedwordlist.com/lists/swearWords.txt'

class BannedWordsStore {

    constructor(){}

    FilterMovies(...jsonMovies) {
        return new Promise((resolve, reject) => {
            axios.get(URL).then(res => {

                console.log("Filtering movies by banned words...")
                
                let bannedWords = res.data.split('\n').filter(v => v != '').map(v => v.replace('\r', ''))
              
                let filteredMovies = jsonMovies.filter(movie => {

                    let filterOff = false
                    bannedWords.forEach(bannedWord => {
                        bannedWord = bannedWord.toLowerCase()

                        let title = movie.original_title.toLowerCase()
                        if (title.indexOf(bannedWord) != -1) {
                            filterOff = true 
                            return
                        }

                        let description = movie.overview.toLowerCase()
                        if (description.indexOf(bannedWord) != -1) {
                            filterOff = true
                            return
                        }
                    })

                    return !filterOff
                })
                console.log('Done.\n#')
                resolve(filteredMovies)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = BannedWordsStore