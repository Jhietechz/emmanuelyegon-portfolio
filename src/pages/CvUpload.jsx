import React, { useState } from "react";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CvUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, success: null, error: null });
  const [showLogin, setShowLogin] = useState(!localStorage.getItem("cv_admin_token"));
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    try {
      const res = await fetch(`${API_URL}/cv/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("cv_admin_token", data.token);
        setShowLogin(false);
        setStatus({ loading: false, success: "Login successful!", error: null });
      } else {
        setStatus({ loading: false, success: null, error: data.error || "Login failed." });
      }
    } catch {
      setStatus({ loading: false, success: null, error: "Login failed." });
    }
  };

  // Upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus({ loading: true, success: null, error: null });
    const formData = new FormData();
    formData.append("cv", file);
    try {
      const res = await fetch(`${API_URL}/cv/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cv_admin_token") || ""}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ loading: false, success: "CV uploaded successfully!", error: null });
      } else {
        setStatus({ loading: false, success: null, error: data.error || "Upload failed." });
      }
    } catch {
      setStatus({ loading: false, success: null, error: "Upload failed." });
    }
  };

  // If not logged in, show login form
  if (showLogin) {
    return (
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" mb={2}>Admin Login</Typography>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField
            label="Username"
            value={loginForm.username}
            onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" disabled={status.loading}>
            {status.loading ? "Logging in..." : "Login"}
          </Button>
          {status.error && <Typography color="error">{status.error}</Typography>}
        </form>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" mb={2}>Upload/Update CV</Typography>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <Button type="submit" variant="contained" disabled={status.loading}>
          {status.loading ? "Uploading..." : "Upload"}
        </Button>
        {status.success && <Typography color="success.main">{status.success}</Typography>}
        {status.error && <Typography color="error">{status.error}</Typography>}
      </form>
    </Box>
  );
};

export default CvUpload;
