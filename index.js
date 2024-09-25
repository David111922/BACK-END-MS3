const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Search for books based on a query (e.g., title or author)
app.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  const apiUrl = `https://openlibrary.org/search.json?q=${query}`;
//   console.logconsole.log(`Searching Open Library with URL: ${apiUrl}`);
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send back the search results
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Open Library API');
  }
});

// Get book details using ISBN
app.get('/book/:isbn', async (req, res) => {
  const { isbn } = req.params;
  const apiUrl = `https://openlibrary.org/isbn/${isbn}.json`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send back book details
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Open Library API');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
