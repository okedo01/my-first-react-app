import React, { useEffect, useState } from 'react'
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

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

        <section className="all-movies">
          <h2 className='mt-[40px]'>All Movies</h2>
          
          { isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <div className='text-red-500'>{ errorMessage }</div>
          ) : (
            <ul>
              { movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/> 
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App;
