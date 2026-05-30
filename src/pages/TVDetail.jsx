import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrailerModal from "../components/TrailerModal";
import "../css/MovieDetail.css"; 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function TVDetail() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        // Nembak ke endpoint /tv/ bukan /movie/
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
        );
        const data = await response.json();
        setShow(data);

        // FETCH TRAILER KHUSUS SERIES
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`,
        );
        const videoData = await videoResponse.json();

        const trailer = videoData.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Loading series information...</div>;
  }

  if (!show) {
    return <div className="detail-loading">Series not found.</div>;
  }

  return (
    <div className="movie-detail">
      {/* BACKDROP */}
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
        }}
      >
        <div className="detail-overlay">
          <div className="detail-content">
            {/* POSTER */}
            <div className="detail-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
            </div>

            {/* INFO */}
            <div className="detail-info">
              <h1>{show.name}</h1>

              <div className="detail-meta">
                <span>⭐ {show.vote_average?.toFixed(1)}</span>
                <span>{show.first_air_date?.split("-")[0]}</span>
                {/* Info khusus Series: Menampilkan jumlah Season & Episode */}
                <span>{show.number_of_seasons} Seasons</span>
                <span>{show.number_of_episodes} Episodes</span>
              </div>

              <div className="genres">
                {show.genres?.map((genre) => (
                  <span className="genre-tag" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="detail-overview">{show.overview}</p>

              <div className="detail-buttons">
                <button className="watch-btn">▶ Watch Now</button>
                <button
                  className="trailer-btn"
                  onClick={() => setShowTrailer(true)}
                >
                  Trailer
                </button>
                <TrailerModal
                  isOpen={showTrailer}
                  onClose={() => setShowTrailer(false)}
                  trailerKey={trailerKey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVDetail;
