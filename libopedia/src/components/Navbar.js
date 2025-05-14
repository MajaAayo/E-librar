import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBookmark } from 'react-icons/fa';

const Navbar = () => {
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const updateBookmarkCount = useCallback(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarkCount(bookmarks.length);
    }, []);

    const handleStorageChange = useCallback(() => {
        updateBookmarkCount();
    }, [updateBookmarkCount]);

    useEffect(() => {
        updateBookmarkCount();
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('bookmarkUpdate', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('bookmarkUpdate', handleStorageChange);
        };
    }, [handleStorageChange, updateBookmarkCount]);

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="search-button"
                        aria-label="Search"
                        onClick={handleSearch}
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