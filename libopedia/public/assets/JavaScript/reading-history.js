        const readingHistoryList = document.getElementById('reading-history-list');
        const noHistoryMessage = document.getElementById('no-history');
      
        function displayReadingHistory() {
          // Retrieve reading history from local storage
          let readingHistory = JSON.parse(localStorage.getItem('readingHistory')) || [];
      
          // Clear any existing list items
          readingHistoryList.innerHTML = '';
      
          if (readingHistory.length === 0) {
            noHistoryMessage.style.display = 'block';
            readingHistoryList.style.display = 'none';
          } else {
            noHistoryMessage.style.display = 'none';
            readingHistoryList.style.display = 'block';
            readingHistory.forEach((book) => {
              const listItem = document.createElement('li');
              listItem.innerHTML = `
                <div class="book-details">
                  <i class="fas fa-book-open list-icon completed-icon"></i>
                  <span class="book-title">${book.title}</span>
                  ${book.author ? `<span class="book-author">by ${book.author}</span>` : ''}
                </div>
                <span class="completion-date">Completed on: ${book.completionDate}</span>
              `;
              listItem.addEventListener('click', () => {
                window.location.href = book.bookUrl;
              });
              readingHistoryList.appendChild(listItem);
            });
          }
        }
      
        // Call displayReadingHistory on page load
        displayReadingHistory();
      
        // Listen for changes to reading history in local storage
        window.addEventListener('storage', (event) => {
          if (event.key === 'readingHistory') {
            displayReadingHistory();
          }
        });
      
        const bookmarkCountSpan = document.querySelector('.bookmark-count');
      
        function updateBookmarkCount() {
          let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
          bookmarkCountSpan.textContent = `(${bookmarks.length})`;
        }
      
        updateBookmarkCount();
      
        window.addEventListener('storage', (event) => {
          if (event.key === 'bookmarks') {
            updateBookmarkCount();
          }
        });