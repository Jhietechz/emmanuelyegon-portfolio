import React from "react";
import { Divider } from "@mui/material";
import { Col, Row } from "react-bootstrap";

const gradientTextStyle = {
  background: "linear-gradient(90deg, #C8A2C8 0%, rgb(153, 73, 227) 50%, #511D43 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
};

const Experience = () => (
  <section id="experience" className="py-16 px-4 max-w-3xl mx-auto">
     <Divider sx={{
      "&::before, &::after": {
        borderColor: "#ccc",
        content: '""',
        
      },
      marginBottom: "1rem",
    }}>
    <div className="flex items-center justify-center gap-1 mx-3">
      <img src="assets/experience.png" alt="Experience" style={{ width: "40px", height: "40px" }} />
      <h2 style={gradientTextStyle} className="text-3xl font-bold text-center">Experience</h2>
    </div>
    </Divider>
    <Row className="text-white/90 text-lg mb-6">  
        <Col md={6} xs={12}  style={{ background: '#511D43' }} className="text-start p-3">
        <p className="text-white/90 text-lg mb-6 text-center">
          My professional journey has been enriched by diverse roles, each contributing to my growth as a developer and IT professional.
        </p>
    
    <div className="text-white/90 text-lg">
      <strong>End User Support – Present, Kericho</strong>
      <ul className="list-style-none list-inside mt-2 text-left">
        <li>🏷️ Provided technical support and troubleshooting for users.</li>
        <li>🏷️ Assisted with software installations and updates.</li>
        <li>🏷️ Helped maintain IT documentation and inventory.</li>
      </ul>
    </div>
        </Col>
      <Col md={6} xs={12} className="text-center d-flex flex-column align-items-center justify-content-center">
        <img
          src="assets/experience-side.png"
          alt="Experience"
          style={{ width: "350px", height: "400px" }}
          className="rounded-lg mb-4"
        />
      </Col>

</Row>
</section>
);

export default Experience;
