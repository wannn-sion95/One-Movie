const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  const data = await response.json();
  return data.results;
};

export const getMoviesByCategory = async (endpoint) => {
  const separator = endpoint.includes("?") ? "&" : "?";
  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};
