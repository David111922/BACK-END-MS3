const express = require('express');
const router = express.Router();
const db = require("../models");

// adjust the path according to your project structure

// Middleware to parse JSON bodies
router.use(express.json());

// POST endpoint to create a new book
router.post('/', async (req, res) => {
    const { title, author, isbn, openLibraryKey, cover_i } = req.body;

    console.log('Received POST request with body:', req.body); // Debugging line to check the incoming data

    try {
        // Create a new record in the Books model in the database    
        const newBook = await db.Book.create({
            title,
            author,
            isbn,
            openLibraryKey,
            cover_i,
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).send('Error creating book');
    }
});

// GET endpoint to retrieve all books
router.get('/', async (req, res) => { // Adjusted path to match POST
    try {
        const books = await db.Book.findAll();
        res.json(books);
    } catch (error) {
        console.error('Error getting books:', error);
        res.status(500).send('Error getting books');
    }
});

// PUT endpoint to update a book by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn } = req.body;

    try {
        const [updatedCount] = await db.Book.update(
            { title, author, isbn },
            { where: { id } }
        );

        if (updatedCount === 0) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book updated successfully');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
});

// DELETE endpoint to remove a book by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db.Book.destroy({ where: { id } });

        if (deletedCount === 0) {
            return res.status(404).send('Book not found');
        }

        res.status(204).send(); // No content response but the request was processed successfully
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

module.exports = router;
