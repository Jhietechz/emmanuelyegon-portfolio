import React, { useState } from "react";
import Divider from '@mui/material/Divider';
import { Col, Row } from "react-bootstrap";
import { FaTelegram, FaTelegramPlane } from "react-icons/fa";

// Use import.meta.env for Vite projects instead of process.env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const gradientTextStyle = {
  background: "linear-gradient(90deg, #C8A2C8 0%,rgb(153, 73, 227) 50%, #511D43 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
};

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ loading: false, success: null, error: null });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: null, error: null });
        try {
            const res = await fetch(`${API_URL}/mail/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus({ loading: false, success: "Message sent successfully!", error: null });
                setForm({ name: "", email: "", message: "" });
            } else {
                const data = await res.json();
                setStatus({ loading: false, success: null, error: data.error || "Failed to send message." });
            }
        } catch (err) {
            setStatus({ loading: false, success: null, error: "Failed to send message." });
        }
    };

    return (
        <div id="contact" className="py-16  mx-auto text-center">
            <Divider sx={{
                "&::before, &::after": {
                    borderColor: "#ccc",
                    content: '""',
                },
                marginBottom: "1rem",
            }}>
                <div className="flex items-center justify-center gap-1 mx-3">
                    <img src="assets/contact.png" alt="Contact" style={{ width: "40px", height: "40px" }} />
                    <h2
                        className="text-3xl font-bold text-center"
                        style={gradientTextStyle}
                    >
                        Contact
                    </h2>
                </div>
            </Divider>
            <Row className="text-white/90 text-lg mb-3 w-100 d-flex justify-content-between">
            <Col md={6} xs={12} className="text-start d-flex flex-column align-items-center justify-content-center">
            <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-white/90">
                    Phone:{" "}
                    <a href="tel:+254746274335" className="text-[#C8A2C8] underline">
                        +254 746274335
                    </a>
                </span>
                <span className="text-white/90">
                    WhatsApp:{" "}
                    <a
                        href="https://wa.me/254746274335"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C8A2C8] underline"
                    >
                        Chat on WhatsApp
                    </a>
                </span>
            </div>
            <div className="flex flex-row gap-2 mb-2">
            <img
                src="assets/contact-side.png"
                alt="Contact"
                style={{ width: "300px", height: "350px" }}
                className="rounded-lg mb-4"
            />
            <div className="font-semibold">
                <strong>Address:</strong>
            <p className="text-white/90">
              2030, 20200 - Kericho, Kenya
            </p>
            </div>
            </div>
            </Col>
            <Col md={6} xs={12} className="text-end">
            <Divider sx={{
                "&::before, &::after": {
                    borderColor: "#ccc",
                    content: '""',
                },
            }}>
                <span className="text-white/90">
                    Have a question or want to collaborate?
                </span>
            </Divider>
            <span className="text-white/90 mb-4">
                Let's connect via Email:
            </span>
            <form className="flex flex-col gap-4 mx-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="p-3 rounded bg-[#511D43]/60 text-white"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 rounded bg-[#511D43]/60 text-white"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    className="p-3 rounded bg-[#511D43]/60 text-white"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-[#511D45] text-white fw-bold px-4 py-2 rounded hover:bg-[#511D47] transition"
                    disabled={status.loading}
                >
                    {status.loading ? "Sending..." : <>{"Send Message"} <FaTelegramPlane className="inline ml-2" /></>}
                </button>
                {status.success && <div className="text-green-400">{status.success}</div>}
                {status.error && <div className="text-red-400">{status.error}</div>}
            </form>
            </Col>
            </Row>
        </div>
    );
};

export default Contact;
