const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'house_catalog'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = db;
