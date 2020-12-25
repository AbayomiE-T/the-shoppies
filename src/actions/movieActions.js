import { GET_MOVIES } from './types'

export const getMovies = (movieName) => (dispatch) => {

    fetch(`http://www.omdbapi.com/?s=${movieName}&type=movie&apikey=23227513`)
        .then(res => res.json())
        .then(data => dispatch({
            type: GET_MOVIES,
            data
        })).catch(err => console.log(err))
}