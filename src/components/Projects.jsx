import React from "react";
import { Divider } from "@mui/material";
import { Row , Col} from "react-bootstrap";
import Background from "three/src/renderers/common/Background.js";
const Projects = () => (
  <section id="projects" className="py-16 px-4 max-w-5xl mx-auto">
     <Divider sx={{
      "&::before, &::after": {
        borderColor: "#ccc",
        content: '""',
        
      },
      marginBottom: "1rem",
    }}>
 <div className="flex items-center justify-center gap-1 mx-3">
      <img src="assets/projects.png" alt="Projects" style={{ width: "40px", height: "40px" }} />
      <h2 className="text-3xl font-bold text-[#C8A2C8] text-center">Projects</h2>
    </div>   
     </Divider>
     <Row className="text-white/80 text-lg mb-6">
  <Col md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} style={{ background: '#511D43' }} className="text-start p-3">
      <p className="text-white/80 text-lg mb-6 text-center">
        My projects showcase my skills in web development, software engineering, and problem-solving. Here are some highlights:
      </p>
      <ul className="list-style-none list-inside space-y-4">
        <li>
          <strong>🏷️ Portfolio Website</strong> – A personal website to showcase my skills and projects.
        </li>
        <li>
          <strong>🏷️ Task Manager App</strong> – A web application for managing tasks and to-do lists.
        </li>
        <li>
          <strong>🏷️ E-commerce Platform</strong> – A full-stack application for online shopping.
        </li>
        <li>
          <strong>🏷️ Blogging Platform</strong> – A platform for creating and sharing blog posts.
        </li>
        <li>
          <strong>🏷️ Chat Application</strong> – A real-time chat application using WebSocket.
        </li>
        <li>
          <strong>🏷️ Whatsapp chatbots</strong> – A Whatsapp chatbot with intergrated AI assistance.
        </li>
        <li>
          <strong>🏷️ AI-Powered Applications</strong> – Projects utilizing AI for enhanced functionality.
        </li>
      </ul>
    </Col>
    <Col md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="text-center">
      <img
        src="assets/projects-side.png"
        alt="Projects"
        style={{ width: "350px", height: "400px" }}
        className="rounded-lg mb-4"
      />
    </Col>
       </Row> 
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="w-75 text-end">
      <p className="mb-4">I am currently working on several projects to enhance my skills and showcase my abilities. My projects makes use of vast variety of latest technology tools.</p>
      <p>Project showcase coming soon.</p>
    </div>
 
  </section>
);

export default Projects;
