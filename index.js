const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require('./routes/dbRoutes.js');
app.use('/api', authRoutes);

// Catch-all route for unspecified paths
app.use('*', (req, res) => {
    res.send("No Routes");
});

module.exports = app;
