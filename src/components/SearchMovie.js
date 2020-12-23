import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movieActions'
import Movie from './Movie';

const SearchMovie = ({ getMovies, movies }) => {

    const [movieName, setMoviename] = useState('');
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getMovies(movieName);
    }, [getMovies, movieName])

    useEffect(() => {
        const movieArray = movies ? movies.map(movie => {
            return (<Movie name={movie.Title} year={movie.Year} poster={movie.Poster} key={movie.imdbID} />)
        }) : (<p>Loading movies...</p>);

        setMovieList(movieArray)
    }, [movies])

    return (
        <>
            <h1 className="main-header">The Shoppies</h1>
            <div className="container">
                <form>
                    <label>Movie title</label>
                    <input type="text" placeholder="Enter movie title" value={movieName} onChange={(e) => setMoviename(e.target.value)} />
                </form>


                <div className="movie-list">
                    <div className="results">
                        <h2>Results for "{movieName}"</h2>
                        <ul>
                            {movieList}
                        </ul>
                    </div>

                    <div className="nominations">
                        <h2>Nominations</h2>
                    </div>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    movies: state.movieCollection.movies
})

export default connect(mapStateToProps, { getMovies })(SearchMovie)
