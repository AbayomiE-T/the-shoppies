import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movieActions'

const SearchMovie = ({ getMovies }) => {

    const [movieName, setMoviename] = useState('');
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        console.log("useEffect hook ran")
        getMovies(movieName);
    }, [getMovies, movieName])

    return (
        <>
            <h1 className="main-header">The Shoppies</h1>
            <div className="container">
                <form>
                    <label>Movie title</label>
                    <input type="text" placeholder="Enter movie title" value={movieName} onChange={(e) => setMoviename(e.target.value)} />
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    movies: state.movieCollection.movies
})

export default connect(mapStateToProps, { getMovies })(SearchMovie)
