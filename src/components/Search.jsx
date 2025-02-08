import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search flex">
            <div className="text-white">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
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