import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Inicializa con false (light mode) sin usar localStorage
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-white font-semibold" : "text-gray-300";

  return (
    <nav className="backdrop-blur-md bg-white/10 dark:bg-black/30 border-b border-white/20 dark:border-black/30 text-white fixed w-full top-0 left-0 z-50 px-6 py-3 flex justify-between items-center shadow-lg transition-all">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        🎬 MovieMatch
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
        <NavLink to="/favorites" className={navLinkStyle}>Favorites</NavLink>
        <NavLink to="/tinder" className={navLinkStyle}>Movie Tinder</NavLink>

        {/* Dark mode button */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 rounded-full p-2 bg-white/20 dark:bg-black/40 hover:scale-105 transition"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? "✖️" : "☰"}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/80 dark:bg-black/90 backdrop-blur-md py-4 flex flex-col items-center gap-4 md:hidden">
          <NavLink onClick={toggleMenu} to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink onClick={toggleMenu} to="/search" className={navLinkStyle}>Search</NavLink>
          <NavLink onClick={toggleMenu} to="/favorites" className={navLinkStyle}>Favorites</NavLink>
          <NavLink onClick={toggleMenu} to="/tinder" className={navLinkStyle}>Movie Tinder</NavLink>
          
          {/* Dark mode button for mobile */}
          <button
            onClick={() => {
              toggleDarkMode();
              toggleMenu();
            }}
            className="mt-2 rounded-full px-4 py-2 bg-white/20 dark:bg-black/40 hover:scale-105 transition"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;