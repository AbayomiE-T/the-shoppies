import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movieActions'
import Movie from './Movie';

const SearchMovie = ({ getMovies, movies }) => {

    const [movieName, setMoviename] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [nominationList, setNominationList] = useState([]);

    const popup = useRef();

    const addToNomination = (movie) => {
        if (nominationList.length + 1 > 5)
            popup.current.classList.toggle("active");

        else
            setNominationList([...nominationList, movie])

    }

    const deleteNomination = (movie) => {
        const newList = nominationList.filter((currMovie) => {
            return currMovie.name !== movie.name
        })

        setNominationList(newList);
    }

    useEffect(() => {
        getMovies(movieName);
    }, [getMovies, movieName])


    useEffect(() => {
        setMovieList(movies);
    }, [movies])

    const movieArray = movieList ? movieList.map(movie => {
        return (<Movie name={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            addToNomination={addToNomination}
            btnText="Nominate"
            id={movie.imdbID}
            key={movie.imdbID} />)
    }) : (<p>Nothing to see here yet...</p>);

    return (
        <>
            <div ref={popup} className="popup">
                <p>You cannot have more than 5 movies in your nominations.</p>
            </div>
            <h1 className="main-header">The Shoppies</h1>
            <div className="container">
                <form>
                    <label>Movie title</label>
                    <input type="text" placeholder="Enter movie title" value={movieName} onChange={(e) => setMoviename(e.target.value)} />
                </form>


                <div className="movie-list">
                    <div className="results">
                        <h2>Results for "{movieName}"</h2>
                        <div className="results-list">
                            {movieArray}
                        </div>
                    </div>

                    <div className="results">
                        <h2>Nominations</h2>
                        {nominationList.map((nomination) => {
                            return (<Movie name={nomination.name}
                                year={nomination.year}
                                poster={nomination.poster}
                                deleteNomination={deleteNomination}
                                btnText="Remove"
                                key={nomination.id} />)
                        })}
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
