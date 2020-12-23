import React from 'react'

const Movie = ({ name, year, poster }) => {
    return (
        <li>
            {name} ({year})
            <img src={poster} alt="" />
        </li>
    )
}

export default Movie
