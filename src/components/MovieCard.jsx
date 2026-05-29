import "../css/MovieCard.css";

import { motion } from "framer-motion";

import { FaHeart, FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";

import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(movie.id);

  // HANDLE FAVORITE
  const handleFavorite = (e) => {
    e.preventDefault();

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <motion.div
        className="movie-card"
        whileHover={{
          scale: 1.02,
          y: -4,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        {/* POSTER */}
        <div className="movie-poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />

          {/* OVERLAY */}
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={handleFavorite}
            >
              <FaHeart />
            </button>

            <div className="movie-rating">
              <FaStar />

              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="movie-info">
          <h3>{movie.title}</h3>

          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default MovieCard;
  