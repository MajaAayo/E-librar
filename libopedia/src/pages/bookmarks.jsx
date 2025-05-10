import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BookCard = ({ book }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!book || !book.id) return; // Ensure book and book.id exist
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const exists = bookmarks.some(b => b.id === book.id);
    setIsBookmarked(exists);
  }, [book]);

  const toggleBookmark = () => {
    if (!book || !book.id) return; // Ensure book and book.id exist
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (isBookmarked) {
      // Remove from bookmarks
      bookmarks = bookmarks.filter(b => b.id !== book.id);
    } else {
      // Add to bookmarks
      bookmarks = [...bookmarks, book];
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
    
    // Dispatch storage event to update navbar count
    window.dispatchEvent(new Event('storage'));
  };

  if (!book) {
    return <div className="book-card">Invalid book data</div>;
  }

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button 
        onClick={toggleBookmark}
        className="bookmark-button"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </div>
  );
};

export default BookCard;