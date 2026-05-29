import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrailerModal from "../components/TrailerModal";

import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState("");

  const [showTrailer, setShowTrailer] = useState(false);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "55742c41b8314d37d173c2cdbedfc728";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
        );

        const data = await response.json();

        setMovie(data);
        // FETCH TRAILER

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`,
        );

        const videoData = await videoResponse.json();

        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Loading movie...</div>;
  }

  return (
    <div className="movie-detail">
      {/* BACKDROP */}
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="detail-overlay">
          <div className="detail-content">
            {/* POSTER */}
            <div className="detail-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            {/* INFO */}
            <div className="detail-info">
              <h1>{movie.title}</h1>

              <div className="detail-meta">
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>

                <span>{movie.release_date?.split("-")[0]}</span>

                <span>{movie.runtime} min</span>
              </div>

              <div className="genres">
                {movie.genres?.map((genre) => (
                  <span className="genre-tag" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="detail-overview">{movie.overview}</p>

              <div className="detail-buttons">
                <button className="watch-btn">▶ Watch Now</button>

                <button
                  className="trailer-btn"
                  onClick={() => setShowTrailer(true)}
                >
                  Trailer
                </button>
                <TrailerModal
                  isOpen={showTrailer}
                  onClose={() => setShowTrailer(false)}
                  trailerKey={trailerKey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
