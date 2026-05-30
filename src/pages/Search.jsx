import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import "../css/Home.css"; // Kita pakai ulang css grid dari Home

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Mengambil teks pencarian dari URL

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        console.error("Failed to search", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div
      className="movies-section"
      style={{ paddingTop: "100px", minHeight: "80vh" }}
    >
      <h2 className="section-title">Search Results for "{query}"</h2>

      {loading ? (
        <LoadingSkeleton />
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No Movies Found 🎬</h2>
          <p>We couldn't find any match for "{query}".</p>
        </div>
      )}
    </div>
  );
}

export default Search;
