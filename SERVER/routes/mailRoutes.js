const express = require("express");

module.exports = (transporter) => {
  const router = express.Router();
  const mysql = require("mysql");

  // Use the same DB config as in server.js
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  router.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to MySQL
    const sql = "INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())";
    db.query(sql, [name, email, message], (err, result) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ error: "Database error." });
      }

      // Enhanced subject and HTML email
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `📬 New Portfolio Contact from ${name} (${email})`,
        text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8f6fa; padding: 24px;">
            <h2 style="color: #4B0082; margin-bottom: 8px;">New Portfolio Contact Message</h2>
            <table style="width:100%; max-width:500px; background:#fff; border-radius:8px; box-shadow:0 2px 8px #0001; padding:16px;">
              <tr>
                <td style="font-weight:bold; color:#511D43;">Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold; color:#511D43;">Email:</td>
                <td><a href="mailto:${email}" style="color:#8A2BE2;">${email}</a></td>
              </tr>
              <tr>
                <td style="font-weight:bold; color:#511D43; vertical-align:top;">Message:</td>
                <td style="white-space:pre-line; color:#222;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
              </tr>
            </table>
            <p style="font-size:13px; color:#888; margin-top:24px;">This message was sent from your portfolio website contact form.</p>
          </div>
        `,
        replyTo: email,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Mail error:", error);
          return res.status(500).json({ error: "Failed to send email." });
        }
        return res.json({ success: true });
      });
    });
  });

  return router;
};
