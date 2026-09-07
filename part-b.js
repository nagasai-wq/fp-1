const express = require("express");

const app = express();

const PORT = 3000;


// --------------------------------------
// Middleware
// Allows Express to read JSON data
// --------------------------------------

app.use(express.json());


// --------------------------------------
// In-memory Books Array
// --------------------------------------

let books = [
    {
        id: 1,
        title: "The Hobbit",
        author: "Tolkien"
    },
    {
        id: 2,
        title: "Dune",
        author: "Herbert"
    }
];


// Auto-increment ID
let nextId = 3;


// ======================================
// 1. GET /books
// Get all books
// ======================================

app.get("/books", (req, res) => {

    res.json(books);

});


// ======================================
// 2. GET /books/:id
// Get a specific book
// ======================================

app.get("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {

        return res.status(404).json({
            message: "Book not found"
        });

    }

    res.json(book);

});


// ======================================
// 3. POST /books
// Add a new book
// ======================================

app.post("/books", (req, res) => {

    const { title, author } = req.body;

    // Check input
    if (!title || !author) {

        return res.status(400).json({
            message: "Title and author are required"
        });

    }

    const newBook = {
        id: nextId++,
        title: title,
        author: author
    };

    books.push(newBook);

    res.status(201).json(newBook);

});


// ======================================
// 4. DELETE /books/:id
// Delete a book
// ======================================

app.delete("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {

        return res.status(404).json({
            message: "Book not found"
        });

    }

    books.splice(bookIndex, 1);

    res.status(204).send();

});


// --------------------------------------
// 404 Handler
// --------------------------------------

app.use((req, res) => {

    res.status(404).json({
        message: "Route Not Found"
    });

});


// --------------------------------------
// Start Server
// --------------------------------------

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});
