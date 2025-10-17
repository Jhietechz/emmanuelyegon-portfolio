require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const nodemailer = require("nodemailer");
const multer = require("multer");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173", "https://ecotrace.co.ke"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "https://ecotrace.co.ke"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use a connection pool instead of creating a new connection for every request
const dbPool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: false,
  connectionTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error) => {
  if (error) {
    console.error("Nodemailer configuration error:", error);
  } else {
    console.log("Nodemailer is configured and ready to send emails.");
  }
});

// Routes
const mailRoutes = require("./routes/mailRoutes")(transporter);

app.use("/mail", mailRoutes);

// Move this route ABOVE the frontend catch-all route!
app.get("/cv/latest", (req, res) => {
  dbPool.query(
    "SELECT cv_url FROM cvs ORDER BY uploaded_at DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error("DB error in /cv/latest:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        console.log("No CV found in /cv/latest");
        return res.status(404).json({ error: "No CV found" });
      }
      console.log("CV URL returned from /cv/latest:", results[0].cv_url);
      res.json({ cv_url: results[0].cv_url });
    }
  );
});

// Serve uploaded files statically (this must come BEFORE the frontend catch-all)
app.use("/uploads", (req, res, next) => {
  console.log("Serving file from /uploads:", req.url);
  next();
}, express.static(path.join(__dirname, "uploads")));

// Serve frontend (optional, for production)
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Configure multer for file uploads (CVs)
const upload = multer({
  dest: path.join(__dirname, "uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed!"));
  },
});

// Add login endpoint for CV admin
app.post("/cv/login", (req, res) => {
  const { username, password } = req.body;
  // Use dbPool instead of db
  dbPool.query(
    "SELECT * FROM cv_admins WHERE username = ? LIMIT 1",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!results.length) return res.status(401).json({ error: "Invalid credentials" });
      const user = results[0];
      // For production, use bcrypt.compareSync(password, user.password_hash)
      if (user.password !== password) return res.status(401).json({ error: "Invalid credentials" });
      // Issue a simple token (for demo, use JWT in production)
      const token = Buffer.from(`${username}:${password}`).toString("base64");
      res.json({ token });
    }
  );
});

// Protect CV upload endpoint
app.post("/cv/upload", (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const token = auth.replace("Bearer ", "");
  const [username, password] = Buffer.from(token, "base64").toString().split(":");
  // Use dbPool instead of db
  dbPool.query(
    "SELECT * FROM cv_admins WHERE username = ? LIMIT 1",
    [username],
    (err, results) => {
      if (err || !results.length || results[0].password !== password) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      next();
    }
  );
}, upload.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded or invalid file type." });
  }
  // Optionally, rename/move the file to a consistent name
  const filePath = `/uploads/${req.file.filename}.pdf`;
  const fs = require("fs");
  const oldPath = req.file.path;
  const newPath = path.join(__dirname, "uploads", req.file.filename + ".pdf");
  fs.renameSync(oldPath, newPath);

  // Insert or update the CV record in the DB
  dbPool.query(
    "INSERT INTO cvs (cv_url, uploaded_at) VALUES (?, NOW())",
    [filePath],
    (err, result) => {
      if (err) {
        console.error("CV upload DB error:", err);
        return res.status(500).json({ error: "Database error." });
      }
      res.json({ success: true, cv_url: filePath });
    }
  );
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack || err.message || err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Unhandled promise rejections and uncaught exceptions
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
// Log unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection:", reason);
});

// Log uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1); // Exit the process to avoid undefined behavior
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
