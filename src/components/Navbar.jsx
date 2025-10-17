import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const fadeInVariant = (direction = "up") => {
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 20 : -20 },
    visible: { opacity: 1, y: 0 },
  };
  return variants;
};
const gradientTextStyle = {
  background: "linear-gradient(90deg, #C8A2C8 0%, rgb(153, 73, 227) 50%,rgb(94, 47, 81) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
};
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const profilePic = "https://ui-avatars.com/api/?name=Emmanuel+Yegon&background=4B0082&color=fff&size=256&rounded=true";
  return (
    <motion.nav
      className="w-100 py-4 px-6 flex justify-between items-center bg-[#511D43] shadow-md fixed top-0 left-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-xl font-bold text-white tracking-wide flex items-center">
        <motion.img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full inline-block mr-2"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <span style={gradientTextStyle}> Emmanuel Yegon</span>
        <span
          className="ml-2"
          style={{
            fontFamily: "'Dancing Script', 'Pacifico', cursive",
            fontSize: "0.5em",
            letterSpacing: "1px",
            verticalAlign: "middle",
            color: "rgba(255, 255, 255, 0.8)",
            background: "none",
            fontWeight: 400,
            display: "inline-block"
          }}
        >
          {"<KibetEmmanuel />"}
        </span>
      </div>
      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 text-white font-medium">
        {navLinks.map(link => (
          <motion.li
            key={link.href}
            whileHover={{ scale: 1.1, color: "#C8A2C8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a href={link.href} className="hover:text-[#C8A2C8] transition">{link.label}</a>
          </motion.li>
        ))}
      </ul>
      {/* Hamburger icon */}
      <motion.button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        whileTap={{ scale: 0.9 }}
      >
        {open ? <FaTimes /> : <FaBars />}
      </motion.button>
      {/* Mobile menu */}
      {open && (
        <motion.div
          className="absolute top-full left-0 w-full bg-[#511D43] shadow-lg md:hidden animate-fade-in"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center gap-6 py-6 text-white font-medium">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-[#C8A2C8] transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
