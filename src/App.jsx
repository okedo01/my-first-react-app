import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { updateSearchCount, getTrendingMovies } from './appwrite';

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
  const [trendingMovies, setTrendingMovies] = useState([]);
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

        setIsLoading(false);
        
        if(query && data.results.length > 0) {
          updateSearchCount(query, data.results[0])
        }

      }).catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })
  }

  const loadTrendingMovies = () => {
    getTrendingMovies()
    .then(movies => {
      console.log("FETCHED TRENDING MOVIES", movies);
      setTrendingMovies(movies);
    })
    .catch(error => {
      console.log("error fetching the trending movies", error);
    })
  }

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    movieApp(debounceSearchTerm);
  }, [debounceSearchTerm])

useEffect(() => {
  loadTrendingMovies();
}, [])

  return (
    <main>
      <div className="wrapper">
        <header>
          <img  className='rounded-2xl object-cover mb-[40px]' src="./hero.jpeg" alt="hero banner" />
          <h1>Be free to search for <span className="text-gradient">Okedo</span> Movies</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
       
          { trendingMovies.length > 0 && (
            <section className='trending'>
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        
        <section className="all-movies">
          <h2>All Movies</h2>
          
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
