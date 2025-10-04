import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          BookReview Platform
        </Link>

        {/* Menu */}
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>

          {isAuthenticated && (
            <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-link" to="/add-book">
                Add Book
              </Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center">
          <button onClick={toggleDarkMode} className="btn btn-secondary me-3">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-success me-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
