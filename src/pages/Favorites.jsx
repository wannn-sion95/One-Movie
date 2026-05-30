import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Film favorite belum ditambahkan! 🍿</h2>
        <p>Silahkan pilih film sesuai selera anda di halaman Home.</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">My Favorites</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
