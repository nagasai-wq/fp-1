const express = require("express");

const app = express();

const PORT = 3000;


// ======================================
// 1. Logger Middleware
// ======================================

function logger(req, res, next) {

    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    next();
}


// ======================================
// 2. Request Timing Middleware
// ======================================

function timer(req, res, next) {

    const start = Date.now();

    res.on("finish", () => {

        const time = Date.now() - start;

        console.log(
            `Request completed in ${time} ms`
        );

    });

    next();
}


// ======================================
// Apply Middleware Globally
// ======================================

app.use(logger);

app.use(timer);


// ======================================
// 3. Normal Route
// ======================================

app.get("/", (req, res) => {

    res.send("Middleware Lab");

});


// ======================================
// 4. Another Route
// ======================================

app.get("/books", (req, res) => {

    res.json([
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
    ]);

});


// ======================================
// 5. Route-Specific Middleware
// ======================================

function checkApiKey(req, res, next) {

    const apiKey = req.headers["x-api-key"];

    if (apiKey === "12345") {

        next();

    } else {

        res.status(401).send("Unauthorized");

    }

}


// ======================================
// Protected Route
// ======================================

app.get(
    "/protected",
    checkApiKey,
    (req, res) => {

        res.send("You have access to the protected route!");

    }
);


// ======================================
// 404 Handler
// ======================================

app.use((req, res) => {

    res.status(404).send("Route Not Found");

});


// ======================================
// Start Server
// ======================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});
