const axios = require('axios');

const API_KEY = process.env.OMDB_KEY;


exports.getFilmsList = function (search = '') {
    return new Promise((resolve, reject) => {
        if (search.length >= 3) {
            axios.get('http://www.omdbapi.com/', {
                params: {
                    apikey: API_KEY,
                    s: search
                }
            })
                .then(function (response) {
                    if (response.data.hasOwnProperty('Search')) {
                        resolve(response.data.Search);
                    } else {
                        resolve([]);
                    }
                })
                .catch(function (error) {
                    reject(new Error(`${error}`));
                    console.log(error);
                });
        } else {
            reject(new Error('Il faut plus de caractère'));
        }

    });

}

exports.getFilmById = function (id) {
    return new Promise((resolve, reject) => {
        axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: API_KEY,
                i: id
            }
        })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(new Error(`${error}`));
                console.log(error);
            })
    });
}
