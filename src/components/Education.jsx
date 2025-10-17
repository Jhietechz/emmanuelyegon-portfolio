import React from "react";
import { Row, Col } from "react-bootstrap"; // Ensure you have react-bootstrap installed
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Divider } from "@mui/material";
const Education = () => (
  <section id="education" className="py-16 px-4 max-w-3xl mx-auto">
    <Divider sx={{
      "&::before, &::after": {
        borderColor: "#ccc",
        content: '""',
      },
      marginBottom: "1rem",
    }}>
    
    <div className="flex items-center justify-center gap-1 mx-3">
      <img src="assets/education.png" alt="Education" style={{ width: "40px", height: "40px" }} />
      <h2 className="text-3xl font-bold text-[#C8A2C8] text-center">Education</h2>
    </div>
    </Divider>
    <Row>
      <Col md={6} xs={12} className="text-center d-flex flex-column align-items-center justify-content-center">
        <img
          src="assets/kabianga.png"
          alt="University of Kabianga"
          style={{ display: "block", margin: "0 auto", width: "auto", maxWidth: "100%" }}
          className="h-auto rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-white/90">University of Kabianga</h3>
        <p className="text-white/90">B.Sc. Computer Science (2023–Present)</p>
      </Col>
      <Col md={6} xs={12}  style={{ background: '#511D43' }} className="text-start p-3">
        <p className="text-white/90 text-lg mb-6 text-center">
          My educational journey has equipped me with a solid foundation in computer science principles and practices.
        </p>
        <ul className="text-white/90 text-lg space-y-4">
          <li>
            <strong>🥈 University of Kabianga</strong> (2023–Present) – B.Sc. Computer Science
          </li>
          <li>
            <strong>🥇 St. Joseph’s Kirandich</strong> (2018–2022) – KCSE (Grade B–)
          </li>
        </ul>
      </Col>
    </Row>
  </section>
);

export default Education;
