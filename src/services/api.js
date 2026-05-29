const API_KEY = "55742c41b8314d37d173c2cdbedfc728";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const respone = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await respone.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const respone = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  const data = await respone.json();
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
