import "../css/HeroBanner.css";

import { motion, AnimatePresence } from "framer-motion";

function HeroBanner({ movie }) {
  if (!movie) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={movie.id}
        className="hero-banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-overlay">
          <motion.div
            className="hero-content"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h1>{movie.title}</h1>

            <p>
              {movie.overview?.slice(0, 180)}
              ...
            </p>

            <div className="hero-buttons">
              <button className="play-btn">▶ Watch Now</button>

              <button className="info-btn">More Info</button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default HeroBanner;
