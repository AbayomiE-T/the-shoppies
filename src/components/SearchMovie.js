import React, { useState } from 'react';

const SearchMovie = () => {

    const [movieName, setMoviename] = useState('');
    const [movieList, setMovieList] = useState([]);

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

export default SearchMovie
