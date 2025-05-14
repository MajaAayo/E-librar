import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(storedBookmarks);
    }, []);

    const removeBookmark = (bookToRemove) => {
        const updatedBookmarks = bookmarks.filter(
            (book) => !(book.title === bookToRemove.title && book.author === bookToRemove.author)
        );
        setBookmarks(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div className="main-content">
            <div className="bookmarks-header">
                <h1>My Bookmarks</h1>
            </div>

            {bookmarks.length === 0 ? (
                <div className="no-bookmarks">
                    <p>No bookmarks yet.</p>
                    <p>
                        Start adding some from the <Link to="/explore">Explore page</Link>!
                    </p>
                </div>
            ) : (
                <div className="book-grid">
                    {bookmarks.map((book, index) => (
                        <div key={`${book.title}-${book.author}-${index}`} className="book-card bookmark-item">
                            <div className="image-container">
                                <img src={book.cover} alt={book.title} />
                                <button
                                    className="remove-bookmark"
                                    onClick={() => removeBookmark(book)}
                                    aria-label={`Remove ${book.title} from bookmarks`}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <h3>{book.title}</h3>
                            <p>by {book.author}</p>
                            <div className="book-actions">
                                <button
                                    onClick={() => {
                                        window.location.href = book.bookUrl;
                                    }}
                                >
                                    Read
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Download functionality to be implemented');
                                    }}
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;