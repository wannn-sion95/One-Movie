import "./css/App.css";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
