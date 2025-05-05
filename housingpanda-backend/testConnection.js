const db = require('./models');

db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('MySQL connection successful:', results);
  }
  db.end(); 
});
