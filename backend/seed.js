const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'house_catalog',
  });

  const users = [
    { email: 'admin@example.com', nama: 'Admin', password: 'rahasia1', role: 'admin' },
    { email: 'user@example.com', nama: 'User', password: 'rahasia1', role: 'user' },
    { email: 'designer@example.com', nama: 'Designer', password: 'rahasia1', role: 'designer' },
  ];

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    await connection.execute(
      'INSERT INTO users (email, nama, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE nama=VALUES(nama), password=VALUES(password), role=VALUES(role)',
      [user.email, user.nama, hash, user.role]
    );
    console.log(`Seeded user: ${user.email}`);
  }

  await connection.end();
}

seed().catch(console.error);