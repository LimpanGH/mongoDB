import React, { useEffect, useState } from 'react';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books');
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
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
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      Title: event.target.title.value,
      Author: event.target.author.value,
      Year: parseInt(event.target.year.value, 10),
      Genre: event.target.genre.value,
      Pages: parseInt(event.target.pages.value, 10),
      ISBN: event.target.isbn.value,
    };

    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        event.target.reset();
        fetchBooks();
      } else {
        console.error('Error adding book:', await response.text());
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <span>
              {book.Title} by {book.Author}, {book.Year} {book._id}
            </span>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input type='text' name='title' placeholder='Title' />
        <input type='text' name='author' placeholder='Author' />
        <input type='number' name='year' placeholder='Year' />
        <input type='text' name='genre' placeholder='Genre' />
        <input type='number' name='pages' placeholder='Pages' />
        <input type='text' name='isbn' placeholder='ISBN' />
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
};

export default App;