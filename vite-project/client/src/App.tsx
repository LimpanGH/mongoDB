import React, { useEffect, useState } from 'react';

interface Book {
  _id: string;
  Title: string;
  Author: string;
  Year: number;
  Genre: string;
  Pages: number;
  ISBN: string;
}

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

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

  const deleteBook = async (bookId: string) => {
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const newBook = {
      Title: (target.elements.namedItem('title') as HTMLInputElement).value,
      Author: (target.elements.namedItem('author') as HTMLInputElement).value,
      Year: (target.elements.namedItem('year') as HTMLInputElement).value,
      Genre: (target.elements.namedItem('genre') as HTMLInputElement).value,
      Pages: (target.elements.namedItem('pages') as HTMLInputElement).value,
      ISBN: (target.elements.namedItem('isbn') as HTMLInputElement).value,
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
        target.reset();
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
      <form onSubmit={handleFormSubmit}>
        <label>
          <input type='text' name='title' placeholder='Title' required />
        </label>
        <label>
          <input type='text' name='author' placeholder='Author' required />
        </label>
        <label>
          <input type='number' name='year' placeholder='Year' required />
        </label>
        <label>
          <input type='text' name='genre' placeholder='Genre' required />
        </label>
        <label>
          <input type='number' name='pages' placeholder='Pages' required />
        </label>
        <label>
          <input type='text' name='isbn' placeholder='ISBN' required />
        </label>
        <label>
          <button type='submit'>Add Book</button>
        </label>
      </form>
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
    </div>
  );
};

export default App;
