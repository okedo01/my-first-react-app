import React, { useEffect, useState } from 'react'
import Search from './components/search';
import MovieList from './components/MovieList';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const movieApp = () => {
    setIsLoading(true);
    setErrorMessage('');

    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    fetch(endpoint, API_OPTIONS)
      .then(res => {
        if(!res.ok) {
          throw new Error("failed to load resources from the server");
        }
        return res.json()
      })
      .then(data => {
        setMovieList(data.results);
        setIsLoading(false);
        
      }).catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    movieApp();
  }, [])

  return (
    <main>
      <div className="wrapper">
        <header>
          <img src="./hero.jpeg" alt="hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without the Hasstle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="movie-list">
          <h1>All Movies</h1>
          
          { isLoading ? (
            <div className='text-white'>Loading...</div>
          ) : errorMessage ? (
            <div className='text-red-500'>{ errorMessage }</div>
          ) : (
            <ul>
              { movieList.map((movie) => (
                <p className='text-white'>{ movie.title }</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App;
