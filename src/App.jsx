import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import MovieTinder from "./pages/MovieTinder";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Puedes agregar aquí un header o navbar si quieres */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tinder" element={<MovieTinder />} />

          {/* Página 404 personalizada si quieres */}
          <Route path="*" element={<h2>404 - Not Found</h2>} />
        </Routes>

        {/* Puedes agregar aquí un footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;

