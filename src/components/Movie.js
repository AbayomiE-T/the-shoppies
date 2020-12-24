import React, { useRef } from 'react'

const Movie = ({ name, year, poster, addToNomination, id, btnText }) => {

    const buttonRef = useRef();

    const handleClick = (movie) => {
        addToNomination(movie)
        buttonRef.current.disabled = true;
    }

    return (
        <div className="card">
            <img src={poster} alt="Movie Poster" />
            <div className="movie-blurb">
                <h4>{name} ({year})</h4>
                <button ref={buttonRef} onClick={() => handleClick({ name, year, poster, id })}>{btnText}</button>
            </div>
        </div>
    )
}

export default Movie
