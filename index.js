require('dotenv').config(); // Load environment variables from .env file

// Core Node.js modules
const path = require('path');

// Third-party modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Environment variable
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection using environment variable
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
}

connectToDatabase();

// Define a schema for the book document
const bookSchema = new mongoose.Schema({
  Title: String,
  Author: String,
  Year: Number,
  Genre: String,
  Pages: Number,
  ISBN: String,
});

// Create a model based on the schema
const Book = mongoose.model('Book', bookSchema);

// Define routes
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const book = await newBook.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    console.log(books);
    res.send(books);
  } catch (error) {
    console.error('Error retrieving books', error);
    res.status(500).send('Internal server error');
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send('Book deleted successfully');
  } catch (error) {
    console.error('Error deleting book', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
