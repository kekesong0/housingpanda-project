const express = require('express');
const router = express.Router();
const connection = require('../models/index');

// Submit housing listing information
router.post('/', (req, res) => {
  const { title, description, rent, address, rooms, contact_info } = req.body;

  const query = `
    INSERT INTO listings (title, description, rent, address, rooms, contact_info)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [title, description, rent, address, rooms, contact_info],
    (err, results) => {
      if (err) {
        console.error('Error inserting listing:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Listing added successfully!' });
    }
  );
});

// Retrieve all housing listings
router.get('/', (req, res) => {
  const query = 'SELECT * FROM listings';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching listings:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Delete housing listing
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM listings WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting listing:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Listing deleted successfully!' });
  });
});

module.exports = router;
