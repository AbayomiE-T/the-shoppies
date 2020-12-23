import React from 'react'

const Movie = ({ name, year }) => {
    return (
        <li>
            {name} ({year})
        </li>
    )
}

export default Movie
