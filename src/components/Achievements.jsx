import React from "react";
import { Divider } from "@mui/material";
import { Col, Row } from "react-bootstrap";

const gradientTextStyle = {
  background: "linear-gradient(90deg, #C8A2C8 0%,rgb(153, 73, 227) 50%, #511D43 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
};

const Achievements = () => (
  <section id="achievements" className="py-16 px-4 max-w-3xl mx-auto">
     <Divider sx={{
          "&::before, &::after": {
            borderColor: "#ccc",
            content: '""',
            
          },
          marginBottom: "1rem",
        }}>
    <div className="flex items-center justify-center gap-1 mx-3">
      <img src="assets/achievements.png" alt="Achievements" style={{ width: "40px", height: "40px" }} />
      <h2 style={gradientTextStyle} className="text-3xl font-bold text-center">Achievements & Certifications</h2>
    </div>
        </Divider>
        <Row className="text-white/90 text-lg mb-6">
         <Col md={6} xs={12} className="text-center">
            <ul className="flex flex-wrap gap-4 justify-center text-white/90 text-lg">
              <li className="bg-[#511D43]/70 px-4 py-2 rounded-full">#100DaysOfCode Completer</li>
              <li className="bg-[#511D43]/70 px-4 py-2 rounded-full">GADS Participant</li>
              <li className="bg-[#511D43]/70 px-4 py-2 rounded-full">Cisco Certification</li>
            </ul>
          </Col>
          <Col md={6} xs={12} className="text-center d-flex flex-column align-items-center justify-content-center">
            <img src="assets/achievements-side.png" alt="Achievements" style={{ width: "350px", height: "400px" }} />
            </Col>
        </Row>
      </section>
    );

export default Achievements;
