import { useEffect, useState } from "react"

const Card = ({title}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} movie has been liked: ${hasLiked}`);
  }, [hasLiked])

  return(
    <div className="card" onClick={() => setCount(count + 1)}>
      <h2>Movie: {title} <br /> {count ? count : null}</h2>

      <button onClick={() => setHasLiked((prevState) => !prevState)}>
        { hasLiked ? 'Liked': 'Like' }
      </button>
    </div>
  )
}

const App = () => {
  return(
    <div className="card-container">
      <Card title="Star Wars"/>
      <Card title="Avatar"/>
      <Card title="Lion King"/>
    </div>
  )
}

export default App;