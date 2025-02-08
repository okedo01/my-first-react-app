const MovieCard = ({ movie: {title, vote_average, poster_path, release_date, original_language }  }) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} />
            <div className="text-white mt-6">
                {title}
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star Icon" />
                        <p>{vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
            
            <br />
        </div>
    );
}
 
export default MovieCard;