import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import MovieTinder from "./pages/MovieTinder";
import Navbar from "./components/NavBar";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="app-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/tinder" element={<MovieTinder />} />

            <Route path="*" element={<h2>404 - Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;

