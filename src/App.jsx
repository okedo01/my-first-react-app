const Card = ({title}) => {
  return(
    <div>
      <h2>Movie: {title}</h2>
    </div>
  )
}

const App = () => {
  return(
    <div>
      <h1>Cards</h1>

      <Card title="Star Wars"/>
      <Card title="Avatar"/>
      <Card title="Lion King"/>
    </div>
  )
}

export default App;