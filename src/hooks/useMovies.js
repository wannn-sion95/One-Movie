/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getPopularMovies, getMoviesByCategory } from "../services/api";

export const useMovies = () => {
  const [moviesData, setMoviesData] = useState({
    popular: [],
    trending: [],
    topRated: [],
    horror: [],
    comedy: [],
    scifi: [],
    romance: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [popular, topRated, horror, comedy, scifi, romance] =
          await Promise.all([
            getPopularMovies(),
            getMoviesByCategory("/movie/top_rated"),
            
          ]);

        setMoviesData({
          popular,
          trending: popular.slice(0, 10),
          topRated,
          horror,
          comedy,
          scifi,
          romance,
        });
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  return { moviesData, loading, error };
};
