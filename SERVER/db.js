require('dotenv').config(); // Load environment variables from .env
const mysql = require('mysql');

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST, // Database host (domain) from .env
  user: process.env.DB_USER, // Database username from .env
  password: process.env.DB_PASSWORD, // Database password from .env
  database: process.env.DB_NAME, // Database name from .env
  port: process.env.DB_PORT, // Database port from .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4' // Use utf8mb4 to support emojis
});

module.exports = db;
