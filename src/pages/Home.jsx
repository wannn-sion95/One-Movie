import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MovieSlider from "../components/MovieSlider";
import "../css/Home.css";
import {
  searchMovies,
  getPopularMovies,
  getMoviesByCategory,
} from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
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
        const popularMovies = await getPopularMovies();
        const topRated = await getMoviesByCategory("/movie/top_rated");
        const horror = await getMoviesByCategory(
          "/discover/movie?with_genres=27",
        );
        const comedy = await getMoviesByCategory(
          "/discover/movie?with_genres=35",
        );
        const scifi = await getMoviesByCategory(
          "/discover/movie?with_genres=878",
        );
        const romance = await getMoviesByCategory(
          "/discover/movie?with_genres=10749",
        );

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

  // Slide tiap film bannner tiaop 5 detik

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setHeroMovieIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  // Search kendali
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);

      setMovies(searchResults);

      setError(null);
    } catch (err) {
      console.log(err);

      setError("Failed to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* SEARCH */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </section>
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
          <h2 className="section-title">
            {searchQuery ? "Search Results" : "Popular Movies"}
          </h2>

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

            <p>Try searching another movie title.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
