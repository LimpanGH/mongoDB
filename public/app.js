document.addEventListener('DOMContentLoaded', async () => {
  // Function to display books
  const displayBooks = (books) => {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = ''; // Clear previous content

    const ul = document.createElement('ul');

    books.forEach((book) => {
      const li = document.createElement('li');

      const text = document.createElement('span');
      text.textContent = `${book.Title} by ${book.author}, ${book.year} ${book._id}`;

      li.appendChild(text);

      const button = document.createElement('button');
      button.textContent = 'Delete';

      button.setAttribute('data-id', book._id);
      button.addEventListener('click', async () => {
        try {
          const response = await fetch(`http://localhost:3000/books/${book._id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            fetchBooks();
          } else {
            console.error('Error deleting book', await response.text());
          }
        } catch (error) {
          console.error('Error deleting book', error);
        }
        li.remove('data-id');
      });

      li.appendChild(button);

      ul.appendChild(li);
    });
    booksList.appendChild(ul);
  };

  // Fetch and display all books
  const fetchBooks = async () => {
    try {
      //   const response = await fetch('/books');
      const response = await fetch('http://localhost:3000/books');
      const books = await response.json();
      console.log(books);
      displayBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Initial fetch of books
  fetchBooks();

  // Handle form submission to add a new book
  const form = document.getElementById('add-book-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newBook = {
      Title: document.getElementById('title').value,
      Author: document.getElementById('author').value,
      Year: parseInt(document.getElementById('year').value, 10),
      Genre: document.getElementById('genre').value,
      Pages: parseInt(document.getElementById('pages').value, 10),
      ISBN: document.getElementById('isbn').value,
    };

    try {
      //   const response = await fetch('/books', {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Clear the form
        form.reset();
        // Fetch and display updated books list
        fetchBooks();
      } else {
        console.error('Error adding book:', await response.text());
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  });
});
