require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.use(express.json()); // Add this line to handle JSON requests

const booksRouter = require('./controller/books')
app.use('/books', booksRouter); // This will route all '/books' requests to booksRouter
// Search for books based on a query (e.g., title or author)
app.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  console.log('query:', query);

  const apiUrl = `https://openlibrary.org/search.json?q=${query}&limit=2`; // Limit to 2 results
  
  try {
    const response = await axios.get(apiUrl);

    // Check if docs exist and return only the first two results
    if (response.data.docs && response.data.docs.length > 0) {
      const books = response.data.docs.slice(0, 2).map(book => ({
        title: book.title,
        authors: book.author_name || [],  // Handle authors being undefined
        key: book.key,
        cover_i: book.cover_i || null,    // Include cover_i if available
        isbn: book.isbn ? book.isbn[0] : null  // Include first ISBN if available


      }));
      res.json(books); // Send back only the first two search results
    } else {
      res.status(404).send('No results found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Open Library API');
  }
});

// Get book details using ISBN
app.get('/book/:isbn', async (req, res) => {
  const { isbn } = req.params;
  const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`; // Corrected API URL for fetching book by ISBN

  try {
    const response = await axios.get(apiUrl);
    
    // Check if the book details exist
    if (response.data[`ISBN:${isbn}`]) {
      res.json(response.data[`ISBN:${isbn}`]); // Send back book details
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Open Library API');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
