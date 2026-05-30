import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MovieSlider from "../components/MovieSlider";
import "../css/Home.css";
import { getPopularMovies, getMoviesByCategory } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [scifiMovies, setScifiMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [heroMovieIndex, setHeroMovieIndex] = useState(0);

  // UI statis
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // load film
  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Menggunakan Promise.all agar semua request berjalan bersamaan
        const [popularMovies, topRated, horror, comedy, scifi, romance] =
          await Promise.all([
            getPopularMovies(),
            getMoviesByCategory("/movie/top_rated"),
            getMoviesByCategory("/discover/movie?with_genres=27"),
            getMoviesByCategory("/discover/movie?with_genres=35"),
            getMoviesByCategory("/discover/movie?with_genres=878"),
            getMoviesByCategory("/discover/movie?with_genres=10749"),
          ]);

        // SET STATES
        setMovies(popularMovies);
        setTrendingMovies(popularMovies.slice(0, 10));
        setTopRatedMovies(topRated);
        setHorrorMovies(horror);
        setComedyMovies(comedy);
        setScifiMovies(scifi);
        setRomanceMovies(romance);

        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Slide tiap film banner tiap 5 detik
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setHeroMovieIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="home">
      {/* HERO BANNER */}
      {!loading && movies.length > 0 && (
        <HeroBanner movie={movies[heroMovieIndex]} />
      )}

      {/* SLIDER SECTION */}
      {!loading && (
        <div className="slider-section">
          <MovieSlider title=" Trending Now" movies={trendingMovies} />
          <MovieSlider title=" Top Rated" movies={topRatedMovies} />
          <MovieSlider title=" Horror Movies" movies={horrorMovies} />
          <MovieSlider title=" Comedy Movies" movies={comedyMovies} />
          <MovieSlider title=" Sci-Fi Movies" movies={scifiMovies} />
          <MovieSlider title=" Romance Movies" movies={romanceMovies} />
        </div>
      )}

      {/* ERROR */}
      {error && <div className="error-message">{error}</div>}

      {/* MAIN MOVIES */}
      <section className="movies-section">
        <div className="section-header">
          <h2 className="section-title">Popular Movies</h2>

          {!loading && (
            <span className="movie-count">{movies.length} Movies</span>
          )}
        </div>

        {/* LOADING */}
        {loading ? (
          <LoadingSkeleton />
        ) : movies.length > 0 ? (
          <motion.div
            className="movies-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
          >
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </motion.div>
        ) : (
          <div className="empty-state">
            <h2>No Movies Found 🎬</h2>
            <p>Check your internet connection or API settings.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
