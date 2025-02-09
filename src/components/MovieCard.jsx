import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie: {title, vote_average, poster_path, release_date, original_language } }) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} />
            <div className="text-white mt-6">
                {title}
                <div className="content">
                    <div className="rating flex items-center">
                        <FontAwesomeIcon icon={faStar} />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                        <span>•</span>
                        <p className="lang"> { original_language} </p>
                        <span>•</span>
                        <p className="year">{ release_date ? release_date.split('-')[0] : 'N/A' }</p>
                    </div>
                </div>
            </div>
            
            <br />
        </div>
    );
}
 
export default MovieCard;