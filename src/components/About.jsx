import React from "react";
import { Divider } from "@mui/material";
const About = () => (
  <section id="about" className="py-16 px-4 bg-[#4B0042]/90 max-w-3xl mx-auto text-center">
     <Divider sx={{
      "&::before, &::after": {
        borderColor: "#ccc",
        content: '""',
        
      },
      marginBottom: "1rem",
    }}>
      <h2 className="text-3xl font-bold text-[#C8A2C8] text-center">About Me</h2>
    </Divider>
    <p className="text-lg text-white/90 leading-relaxed">
      I'm Emmanuel Kibet Yegon, a Computer Science student with a passion for building practical, efficient softwares and Networking Technologies.
       My core expertise lies in the MERN stack (MySQL, Express, React, Node.js), where I enjoy architecting solutions that solve real-world challenges.
        My recent projects have focused on developing secure authentication systems and building real-time communication features. 
      I am driven by a desire to contribute to innovative projects and am currently available for
       freelance opportunities or challenging project-based work where I can apply my problem-solving skills.
      I thrive in collaborative environments and am always eager to learn new technologies and methodologies.
    </p>
  </section>
);

export default About;
