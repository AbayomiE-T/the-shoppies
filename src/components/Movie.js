import React, { useRef } from 'react'

const Movie = ({ name, year, poster, addToNomination, deleteNomination, id, btnText }) => {

    const buttonRef = useRef();

    const handleClick = (movie) => {
        if (btnText === "Nominate") {
            addToNomination(movie);
            buttonRef.current.disabled = true;
        }

        else
            deleteNomination(movie);
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
