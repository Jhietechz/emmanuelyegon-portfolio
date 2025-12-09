import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="text-center py-6 bg-gray-900 text-white">
     <span className="align-self-center ms-3 flex gap-5 text-2xl">
              <motion.a
                href="https://www.linkedin.com/in/kibet-emmanuel-9b8371363"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                whileHover={{ scale: 1.2, color: "#0e76a8" }}
                title="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://github.com/Jhietechz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                whileHover={{ scale: 1.2, color: "#4c4c4cff" }}
                title="GitHub"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="mailto:emmanuelyegon513@gmail.com"
                className="btn-secondary"
                whileHover={{ scale: 1.2, color: "#C8A2C8" }}
                title="Email"
              >
                <FaEnvelope />
              </motion.a>
            </span>
    <div className="text-sm">
      Designed &amp; Developed by Emmanuel Kibet Yegon – © 2025
    </div>
  </footer>
);

export default Footer;
