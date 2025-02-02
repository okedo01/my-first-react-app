const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <img src="./search" alt="search" />
            <input
                type="text" 
                value={searchTerm}
                placeholder="Search through thousands of movies"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
 
export default Search;