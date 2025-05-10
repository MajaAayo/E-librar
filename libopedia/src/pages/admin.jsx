import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  // Load data from local storage on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [
      { id: 1, name: 'User 1', email: 'user1@example.com', role: 'user' },
    ];
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [
      { id: 1, title: 'Book 1', author: 'Author 1', category: 'Fiction', filename: 'book1.pdf' },
    ];
    setUsers(storedUsers);
    setBooks(storedBooks);
  }, []);

  // Save data to local storage whenever users or books change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('books', JSON.stringify(books));
  }, [users, books]);

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    }
  };

  const deleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form['book-title'].value;
    const author = form['book-author'].value;
    const category = form['book-category'].value;
    const fileInput = form['book-pdf'];
    const file = fileInput.files[0];

    if (!title || !author || !category || !file) {
      alert('Please fill in all fields and select a PDF file.');
      return;
    }

    const newBook = {
      id: books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1, // Generate a new unique ID
      title,
      author,
      category,
      filename: file.name, // Store the filename (simulating file upload)
    };

    setBooks([...books, newBook]);
    form.reset(); // Reset the form after submission
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>
          <i className="fas fa-tachometer-alt"></i> Admin Dashboard
        </h1>
      </header>
      <section className="data-section users-section">
        <h2>
          <i className="fas fa-users"></i> Users
        </h2>
        <div className="table-wrapper">
          <table id="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="data-section books-section">
        <h2>
          <i className="fas fa-book"></i> Books
        </h2>
        <div className="table-wrapper">
          <table id="books-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Filename</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.filename}</td>
                  <td>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="add-section">
        <h3>
          <i className="fas fa-plus-circle"></i> Add New Book
        </h3>
        <form id="add-book-form" onSubmit={handleAddBook}>
          <div className="form-group">
            <label htmlFor="book-title">Title:</label>
            <input type="text" id="book-title" placeholder="Enter book title" required />
          </div>
          <div className="form-group">
            <label htmlFor="book-author">Author:</label>
            <input type="text" id="book-author" placeholder="Enter author name" required />
          </div>
          <div className="form-group">
            <label htmlFor="book-category">Category:</label>
            <input type="text" id="book-category" placeholder="Enter category" required />
          </div>
          <div className="form-group">
            <label htmlFor="book-pdf">Choose PDF File:</label>
            <input type="file" id="book-pdf" name="bookPDF" accept=".pdf" required />
          </div>
          <button type="submit" className="button primary">
            <i className="fas fa-save"></i> Add Book
          </button>
        </form>
      </section>
    </div>
  );
};

export default Admin;