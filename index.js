// Required dependencies
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Replace with your actual MySQL password
    database: 'fundraiserDB'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes

// GET all fundraisers
app.get('/api/fundraisers', (req, res) => {
    const query = 'SELECT * FROM FUNDRAISER';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(results);
        }
    });
});

// POST a new fundraiser
app.post('/api/fundraisers', (req, res) => {
    const { CAPTION, ORGANIZER, DATE, AMOUNT, GIVER } = req.body;
    const query = 'INSERT INTO FUNDRAISER (CAPTION, ORGANIZER, DATE, AMOUNT, GIVER) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [CAPTION, ORGANIZER, DATE, AMOUNT, GIVER], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ insert: 'error', message: 'Failed to insert fundraiser' });
        } else {
            res.json({ insert: 'success', fundraiser_id: result.insertId });
        }
    });
});

// PUT (Update) a fundraiser
app.put('/api/fundraisers/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const { CAPTION, ORGANIZER, DATE, AMOUNT, GIVER } = req.body;
    const query = 'UPDATE FUNDRAISER SET CAPTION = ?, ORGANIZER = ?, DATE = ?, AMOUNT = ?, GIVER = ? WHERE FUNDRAISER_ID = ?';
    db.query(query, [CAPTION, ORGANIZER, DATE, AMOUNT, GIVER, fundraiserId], (err, result) => {
        if (err) {
            console.error('Error updating fundraiser:', err);
            res.status(500).json({ update: 'error', message: 'Failed to update fundraiser' });
        } else {
            res.json({ update: 'success' });
        }
    });
});

// DELETE a fundraiser
app.delete('/api/fundraisers/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const query = 'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
    db.query(query, [fundraiserId], (err, result) => {
        if (err) {
            console.error('Error deleting fundraiser:', err);
            res.status(500).json({ delete: 'error', message: 'Failed to delete fundraiser' });
        } else {
            res.json({ delete: 'success' });
        }
    });
});

// Routes to serve the admin-side HTML files
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/donation', (req, res) => {
    res.sendFile(path.join(__dirname, 'donation.html'));
});

app.get('/fundraiser_info', (req, res) => {
    res.sendFile(path.join(__dirname, 'fundraiser_info.html'));
});

// Start the server
const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
