const express = require('express');
const app = express();
const PORT = 3000;

// custom middleware to log HTTP method and path
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
}

// using the custom middleware at the application level
app.use(logger);

// example route
app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello from Express with logger!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})