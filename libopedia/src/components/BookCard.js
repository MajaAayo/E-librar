import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BookCard = ({ book }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setIsBookmarked(
            storedBookmarks.some(
                (b) => b.title === book.title && b.author === book.author
            )
        );
    }, [book.title, book.author]);

    const toggleBookmark = () => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        let updatedBookmarks;

        if (isBookmarked) {
            updatedBookmarks = storedBookmarks.filter(
                (b) => !(b.title === book.title && b.author === book.author)
            );
        } else {
            updatedBookmarks = [...storedBookmarks, book];
        }

        // Update localStorage with a slight delay to prevent race conditions
        setTimeout(() => {
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setIsBookmarked(!isBookmarked);

            // Dispatch storage event for cross-tab updates
            window.dispatchEvent(new Event('storage'));

            // Dispatch custom event for same-tab updates
            window.dispatchEvent(new CustomEvent('bookmarkUpdate'));
        }, 0);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="book-card">
                <div className="image-container">
                    <img src={book.cover} alt={book.title} />
                    <button
                        className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                        onClick={toggleBookmark}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
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
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <button className="view-details-button" onClick={openModal}>
                    View Details
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="book-details-modal">
                        <span
                            className="modal-close-symbol"
                            onClick={closeModal}
                            aria-label="Close modal"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    closeModal();
                                }
                            }}
                        >
                            ×
                        </span>
                        <img src={book.cover} alt={book.title} className="modal-book-cover" />
                        <h2>{book.title}</h2>
                        <p className="modal-book-author">
                            <strong>Author:</strong> {book.author}
                        </p>
                        <p className="modal-book-description">{book.description}</p>
                        <div className="modal-buttons">
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
                </div>
            )}
        </>
    );
};

export default BookCard;