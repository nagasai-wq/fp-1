const express = require("express");

const app = express();

const PORT = 3000;

// --------------------------------------
// 1. Basic Route
// --------------------------------------

app.get("/", (req, res) => {
    res.send("Welcome to ExpressJS Routing Lab!");
});


// --------------------------------------
// 2. Route Parameter
// URL: /user/42
// --------------------------------------

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    res.send(`User ID: ${userId}`);
});


// --------------------------------------
// 3. Query Parameters
// URL: /search?q=express&limit=5
// --------------------------------------

app.get("/search", (req, res) => {
    const query = req.query.q;
    const limit = req.query.limit;

    res.send(`Searching for '${query}', limit ${limit}`);
});


// --------------------------------------
// 4. URL Building
// --------------------------------------

app.get("/url", (req, res) => {
    res.json({
        message: "Current URL",
        originalUrl: req.originalUrl
    });
});


// --------------------------------------
// 5. Redirect
// --------------------------------------

app.get("/home", (req, res) => {
    res.redirect("/");
});


// --------------------------------------
// Start Server
// --------------------------------------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
