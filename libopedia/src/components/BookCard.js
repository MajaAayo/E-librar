import React, { useState } from 'react';

const BookCard = ({ book }) => {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem('bookmarks')) || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBookmark = () => {
    const isBookmarked = bookmarks.some((b) => b.title === book.title);
    let updatedBookmarks;
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter((b) => b.title !== book.title);
    } else {
      updatedBookmarks = [...bookmarks, book];
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
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
            className={`bookmark-button ${
              bookmarks.some((b) => b.title === book.title) ? 'bookmarked' : ''
            }`}
            onClick={toggleBookmark}
          >
            <i className={`fa${bookmarks.some((b) => b.title === book.title) ? '-solid' : '-regular'} fa-bookmark`}></i>
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
                // Implement download logic
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
            <img src={book.cover} alt={book.title} className="modal-book-cover" />
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
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
                  // Implement download logic
                  alert('Download functionality to be implemented');
                }}
              >
                Download
              </button>
            </div>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;