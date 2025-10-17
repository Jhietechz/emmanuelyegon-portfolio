import { Button, Menu, MenuItem, Modal, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaEye, FaChevronDown, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CvUpload from "../pages/CvUpload";
import { Modal as MuiModal, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import PixelBlast from "./PixelBlast"; 
import "./PixelBlast.css"; 

const profilePic = "Public/images/profile.jpg";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const gradientTextStyle = {
  background: "linear-gradient(90deg, #C8A2C8 0%, rgb(153, 73, 227) 50%,rgb(87, 36, 74) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const TiltedCard = ({ children, direction = "left", delay = 0, style = {} }) => (
  <motion.div
    initial={{
      opacity: 0,
      x: direction === "left" ? -60 : 60,
      rotateZ: direction === "left" ? -18 : 18,
      scale: 0.8
    }}
    animate={{
      opacity: 0.8,
      x: direction === "left" ? -30 : 30,
      rotateZ: direction === "left" ? -8 : 8,
      scale: 1
    }}
    exit={{
      opacity: 0,
      x: direction === "left" ? -80 : 80,
      scale: 0.7
    }}
    transition={{ duration: 0.8, delay }}
    style={{
      left: direction === "left" ? "calc(50% - 120px)" : "calc(50% + 120px)",
      zIndex: 2,
      boxShadow: "0 8px 24px #0002",
      borderRadius: "18px",
      background: "#fff",
      minWidth: 100,
      minHeight: 140,
      padding: "0.5rem",
      pointerEvents: "none",
      ...style
    }}
  >
    {children}
  </motion.div>
);

const cardContents = [
  {
    icon: <FaGithub size={32} color="#511D43" />,
    title: "GitHub",
    desc: "Open Source Projects"
  },
  {
    icon: <FaLinkedin size={32} color="#511D43" />,
    title: "LinkedIn",
    desc: "Professional Network"
  },
  {
    icon: <FaEnvelope size={32} color="#511D43" />,
    title: "Email",
    desc: "Let's Connect"
  }
];

const Hero = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState(null);
  const [cvLoading, setCvLoading] = useState(true);
  const [showCvUpload, setShowCvUpload] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginStatus, setLoginStatus] = useState({ loading: false, error: null });
  const navigate = useNavigate();

  // Fetch CV URL on mount
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    setCvLoading(true);
    fetch(`${API_URL}/cv/latest`)
      .then(res => res.json())
      .then(data => {
        setCvUrl(data.cv_url);
        setCvLoading(false);
      })
      .catch(() => {
        setCvUrl(null);
        setCvLoading(false);
      });
  }, []);

  // Dropdown handlers
  const handleCvMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleCvMenuClose = () => setAnchorEl(null);

  const handleViewCv = () => {
    setCvModalOpen(true);
    handleCvMenuClose();
  };
  const handleDownloadCv = () => {
    if (!cvUrl) return;
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = cvUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleCvMenuClose();
  };

  // Handler for secret admin login (could be triggered by a hidden button or a keyboard shortcut)
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginStatus({ loading: true, error: null });
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/cv/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("cv_admin_token", data.token);
        setShowLogin(false);
        setShowCvUpload(true);
        setLoginStatus({ loading: false, error: null });
      } else {
        setLoginStatus({ loading: false, error: data.error || "Login failed." });
      }
    } catch {
      setLoginStatus({ loading: false, error: "Login failed." });
    }
  };

  return (
    <motion.section
      id="hero"
      className="flex flex-col items-center justify-center py-16 mt-4 text-center"
      style={{ background: "#511D43", position: "relative", overflow: "hidden" }}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* PixelBlast interactive background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <PixelBlast
          variant="circle"
          pixelSize={3}
          color="#C8A2C8"
          patternScale={2}
          patternDensity={1}
          liquid={true}
          liquidStrength={0.08}
          liquidRadius={1.2}
          enableRipples={true}
          rippleIntensityScale={1}
          rippleThickness={0.12}
          rippleSpeed={0.35}
          edgeFade={0.5}
          transparent={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {/* Profile image */}
      <motion.img
        src={profilePic}
        alt="Emmanuel Kibet Yegon"
        className="w-32 h-40 rounded border-4 border-[#C8A2C8] shadow-lg mb-6"
        style={{ pointerEvents: "none", zIndex: 3, position: "relative" }}
        draggable={false}
      />
      <motion.h1
        style={gradientTextStyle}
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Emmanuel Kibet Yegon
      </motion.h1>
      <motion.h2
        className="text-xl font-semibold text-[#C8A2C8] mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        B.Sc. Computer Science Student
      </motion.h2>
      <motion.p
        className="max-w-xl mb-6 text-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Passionate about building impactful software, learning new technologies, and collaborating with innovative teams. Seeking opportunities to grow as a developer and contribute to meaningful projects.
      </motion.p>
      <motion.div
        className="flex gap-4 justify-center align-items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          sx={{
            border: "1px solid #8d2be2",
            color: "#8d2be2",
            background: "transparent",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: "0 2px 8px #0002",
            transition: "all 0.2s",
            '&:hover': {
              background: "#7e57a3ff",
              color: "#fffefeac",
              borderColor: "transparent",
              boxShadow: "0 4px 6px #6f3d9fff"
            }
          }}
          onClick={handleCvMenuOpen}
          endIcon={<FaChevronDown />}
          disabled={cvLoading || !cvUrl}
        >
          {cvLoading ? "Loading..." : "Curriculum Vitae"}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCvMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          keepMounted
        >
          <MenuItem onClick={handleViewCv} disabled={!cvUrl}>
            <FaBookOpen className="mr-2" /> View CV
          </MenuItem>
          <MenuItem onClick={handleDownloadCv} disabled={!cvUrl}>
            <FaDownload className="mr-2" /> Download CV
          </MenuItem>
        </Menu>
        <span className="align-self-center flex gap-5 text-2xl">
          <motion.a
            href="https://linkedin.com/in/your-link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            whileHover={{ scale: 1.2, color: "#0e76a8" }}
            title="LinkedIn"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            whileHover={{ scale: 1.2, color: "#333" }}
            title="GitHub"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="mailto:your.email@example.com"
            className="btn-secondary"
            whileHover={{ scale: 1.2, color: "#C8A2C8" }}
            title="Email"
          >
            <FaEnvelope />
          </motion.a>
        </span>
      </motion.div>
  {/* Fading out tilted cards  */}
       <div className="d-flex flex-row mt-10 justify-content-center gap-4" style={{ position: "relative", width: "100%", height: 100, marginTop: 20, pointerEvents: "none", zIndex: 1 }}> 
      <TiltedCard direction="left" delay={0.2} style={{ background: "#fff", boxShadow: "0 8px 24px #C8A2C8" }}>
        {cardContents[0].icon}
        <div style={{ fontWeight: 700, color: "#511D43", marginTop: 8 }}>{cardContents[0].title}</div>
        <div style={{ fontSize: "0.95rem", color: "#7e57a3" }}>{cardContents[0].desc}</div>
      </TiltedCard>
      <TiltedCard direction="left" delay={0.4} style={{ background: "#fff", boxShadow: "0 8px 24px #C8A2C8" }}>
        {cardContents[1].icon}
        <div style={{ fontWeight: 700, color: "#511D43", marginTop: 8 }}>{cardContents[1].title}</div>
        <div style={{ fontSize: "0.95rem", color: "#7e57a3" }}>{cardContents[1].desc}</div>
      </TiltedCard>
      {/* Optionally add a third card below or above */}
      <TiltedCard direction="left" delay={1.2} style={{ background: "#fff", boxShadow: "0 8px 24px #C8A2C8" }}>
        {cardContents[2].icon}
        <div style={{ fontWeight: 700, color: "#511D43", marginTop: 8 }}>{cardContents[2].title}</div>
        <div style={{ fontSize: "0.95rem", color: "#7e57a3" }}>{cardContents[2].desc}</div>
      </TiltedCard>
</div>  
      {/* CV Preview Modal */}
      <Modal
        open={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        aria-labelledby="cv-modal-title"
        aria-describedby="cv-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '98vw', md: '70vw' },
            height: { xs: '90vh', md: '100vh' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 2,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 id="cv-modal-title" className="text-lg font-bold">CV Preview</h2>
            <Button onClick={() => setCvModalOpen(false)} size="small" color="error">Close</Button>
          </div>
          {cvUrl ? (
            <embed
              src={
                cvUrl.startsWith("/")
                  ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${cvUrl}`
                  : cvUrl
              }
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ flex: 1, minHeight: 0, border: "none" }}
            />
          ) : (
            <div className="text-center text-gray-500">CV not available.</div>
          )}
        </Box>
      </Modal>
      {/* Floating CV Upload Modal (only if logged in) */}
      <MuiModal
        open={showCvUpload}
        onClose={() => setShowCvUpload(false)}
        aria-labelledby="cv-upload-modal"
        aria-describedby="cv-upload-modal-desc"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '98vw', md: 500 },
            bgcolor: '#fff',
            boxShadow: 24,
            borderRadius: 2,
            p: 2,
            outline: 'none',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <CvUpload />
        </Box>
      </MuiModal>
      {/* Floating Login Modal (shows login form, then upload modal on success) */}
      <MuiModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        aria-labelledby="cv-login-modal"
        aria-describedby="cv-login-modal-desc"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '98vw', md: 400 },
            bgcolor: '#fff',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            outline: 'none'
          }}
        >
          <Typography variant="h5" mb={2}>Admin Login</Typography>
          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
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
            <Button type="submit" variant="contained" disabled={loginStatus.loading}>
              {loginStatus.loading ? "Logging in..." : "Login"}
            </Button>
            {loginStatus.error && <Typography color="error">{loginStatus.error}</Typography>}
          </form>
        </Box>
      </MuiModal>
      {/* Show a visible "Admin" button for login, but style it to blend in or place it in a less obvious spot */}
      <Button
        sx={{
          minWidth: 32,
          height: 32,
          border: "none",
          color: "",
          background: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
          opacity: 1, // nearly invisible but clickable
          cursor: "pointer"
        }}
        aria-label="Admin Login"
        onClick={() => setShowLogin(true)}
      >
        ~
      </Button>
    </motion.section>
  );
};

export default Hero;
