import React, { useState } from 'react'
import Search from './components/search'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="wrapper">
        <header>
          <img src="./hero.jpeg" alt="hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without the Hasstle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
