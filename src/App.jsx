import React, { useEffect, useState } from 'react'
import Search from './components/search'

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}` 
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const movieApp = () => {
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    fetch(endpoint, API_OPTIONS)
      .then(res => {
        if(!status.OK) {
          throw new Error("failed to load resources from the server");
        }
        return res.json()
      })
      .then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err.message);
        setErrorMessage
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
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1>{searchTerm}</h1>
        <div>{errorMessage}</div>
      </div>
    </main>
  )
}

export default App
