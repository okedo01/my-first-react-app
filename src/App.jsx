import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { updateSearchCount } from './appwrite';

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
  const [ debounceSearchTerm, setDebounceSearchTerm ] = useState('');

  const movieApp = (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    const endpoint = query ? 
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : 
    `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    fetch(endpoint, API_OPTIONS)
      .then(res => {
        if(!res.ok) {
          throw new Error("failed to load resources from the server");
        }
        return res.json()
      })
      .then(data => {
        setMovieList(data.results);

        updateSearchCount();

        setIsLoading(false);
        
        if(query && data.results.length > 0) {
          updateSearchCount(query, data.results[0])
        }

      }).catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })
  }

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    movieApp(debounceSearchTerm);
  }, [debounceSearchTerm])

  return (
    <main>
      <div className="wrapper">
        <header>
          <img  className='rounded-2xl object-cover mb-[40px]' src="./hero.jpeg" alt="hero banner" />
          <h1>Be free to search for <span className="text-gradient">Okedo</span> Movies</h1>
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
