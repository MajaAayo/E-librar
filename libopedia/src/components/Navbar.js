import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBookmark } from 'react-icons/fa';

const Navbar = () => {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to update the bookmark count from localStorage
  const updateBookmarkCount = useCallback(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarkCount(bookmarks.length);
  }, []);

  // Handle storage change events to sync bookmark count across tabs
  const handleStorageChange = useCallback(
    (event) => {
      if (event.key === 'bookmarks') {
        updateBookmarkCount();
      }
    },
    [updateBookmarkCount]
  );

  useEffect(() => {
    // Initial update of bookmark count
    updateBookmarkCount();

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange, updateBookmarkCount]);

  // Function to handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="top-bar"></div>

      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/assets/Logo/pngl.png" alt="Libopedia Logo" />
            <span>LIBOPEDIA</span>
          </Link>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for books..."
            value={searchQuery} // Bind input value to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
          <button
            className="search-button"
            aria-label="Search"
            onClick={handleSearch} // Call handleSearch on button click
          >
            <FaSearch />
          </button>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bookmarks" className="bookmark-btn" aria-label="Bookmarks">
              <FaBookmark />
              <span className="bookmark-count">({bookmarkCount})</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;