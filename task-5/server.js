const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})