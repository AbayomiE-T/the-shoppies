import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movieActions'
import Movie from './Movie';
import PopupMessage from './PopupMessage';

const SearchMovie = ({ getMovies, movies }) => {

    const [movieName, setMoviename] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [nominationList, setNominationList] = useState([]);
    const [popupMessage, setMessage] = useState('');

    const popup = useRef();

    const movieExists = (movie) => {
        for (let i = 0; i < nominationList.length; i++) {
            if (nominationList[i].name === movie.name) {
                return true;
            }
        }

        return false;
    }

    const addToNomination = (movie) => {

        if (movieExists(movie)) {
            setMessage("You cannot nominate a movie already in the list");
            popup.current.classList.toggle("active");
        }

        else if (nominationList.length >= 5) {
            setMessage("You have reached your nomination limit! You can only nominate 5 movies and nothing over that.");
            popup.current.classList.toggle("active");
        }

        else if (nominationList.length + 1 === 5) {
            setMessage("You have reached your nomination limit! You can only nominate 5 movies and nothing over that.");
            popup.current.classList.toggle("active");
            setNominationList([...nominationList, movie]);
        }

        else {
            setNominationList([...nominationList, movie]);
        }

    }

    const deleteNomination = (movie) => {
        const newList = nominationList.filter((currMovie) => {
            return currMovie.name !== movie.name
        })

        setNominationList(newList);
        localStorage.setItem('nominations', JSON.stringify(newList));
    }

    const handleClick = () => {
        popup.current.classList.toggle("active");
    }

    useEffect(() => {
        getMovies(movieName);

        const nominations = localStorage.getItem('nominations');

        if (nominations) {
            setNominationList(JSON.parse(nominations));
        }

    }, [getMovies, movieName])


    useEffect(() => {
        setMovieList(movies);
    }, [movies])

    useEffect(() => {
        localStorage.setItem('nominations', JSON.stringify(nominationList));
    }, [nominationList])

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
                <div className="overlay"></div>
                <div className="popup-content">
                    <div onClick={handleClick} className="close-btn">&times;</div>
                    <h1>WARNING!</h1>
                    <PopupMessage message={popupMessage} />
                </div>
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
