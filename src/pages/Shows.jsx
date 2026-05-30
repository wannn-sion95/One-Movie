import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MovieSlider from "../components/MovieSlider";
import "../css/Home.css";
import { getPopularShows, getShowsByCategory } from "../services/api";

function Shows() {
  const [shows, setShows] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [animationShows, setAnimationShows] = useState([]);
  const [dramaShows, setDramaShows] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);
  const [crimeShows, setCrimeShows] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatTvData = (dataArray) => {
    return dataArray.map((tv) => ({
      ...tv,
      title: tv.name,
      release_date: tv.first_air_date,
    }));
  };

  useEffect(() => {
    const loadShows = async () => {
      try {
        const [popular, topRated, animation, drama, comedy, crime] =
          await Promise.all([
            getPopularShows(),
            getShowsByCategory("/tv/top_rated?"),
            getShowsByCategory("/discover/tv?with_genres=16"), // 16 = Animation
            getShowsByCategory("/discover/tv?with_genres=18"), // 18 = Drama
            getShowsByCategory("/discover/tv?with_genres=35"), // 35 = Comedy
            getShowsByCategory("/discover/tv?with_genres=80"), // 80 = Crime
          ]);

        const formattedPopular = formatTvData(popular);

        setShows(formattedPopular);
        setTrendingShows(formattedPopular.slice(0, 10));
        setTopRatedShows(formatTvData(topRated));
        setAnimationShows(formatTvData(animation));
        setDramaShows(formatTvData(drama));
        setComedyShows(formatTvData(comedy));
        setCrimeShows(formatTvData(crime));

        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load TV Shows.");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  // Slide Hero Banner tiap 5 detik
  useEffect(() => {
    if (shows.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev === shows.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [shows]);

  return (
    <div className="home">
      {/* HERO BANNER KHUSUS SHOWS */}
      {!loading && shows.length > 0 && <HeroBanner movie={shows[heroIndex]} />}

      {/* SLIDER SECTION */}
      {!loading && (
        <div className="slider-section">
          <MovieSlider title=" Trending Shows" movies={trendingShows} />
          <MovieSlider title=" Top Rated Series" movies={topRatedShows} />
          <MovieSlider title=" Animation & Anime" movies={animationShows} />
          <MovieSlider title=" Binge-worthy Dramas" movies={dramaShows} />
          <MovieSlider title=" Comedy Series" movies={comedyShows} />
          <MovieSlider title=" Crime & Investigation" movies={crimeShows} />
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {/* MAIN GRID */}
      <section className="movies-section">
        <div className="section-header">
          <h2 className="section-title">Popular TV Shows</h2>
          {!loading && (
            <span className="movie-count">{shows.length} Shows</span>
          )}
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : shows.length > 0 ? (
          <motion.div
            className="movies-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {shows.map((show) => (
              <MovieCard movie={show} key={show.id} />
            ))}
          </motion.div>
        ) : (
          <div className="empty-state">
            <h2>No Shows Found 📺</h2>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shows;
