const Card = ({title}) => {
  return(
    <div className="card">
      <h2>Movie: {title}</h2>
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