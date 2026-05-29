import "../css/MovieSlider.css";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import MovieCard from "./MovieCard";

function MovieSlider({ title, movies = [] }) {
  return (
    <section className="movie-slider">
      <h2 className="slider-title">{title}</h2>

      <Swiper
        modules={[Navigation]}
        navigation={true}
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 4,
          },

          1024: {
            slidesPerView: 5,
          },

          1400: {
            slidesPerView: 6,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MovieSlider;
