import React, { useRef, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CvUpload from "./pages/CvUpload";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MagicBento from "./components/MagicBento";
import { Card } from "react-bootstrap";
import CardSwap from "./components/CardSwap";

function HomePage() {
  // Alternate directions for each section
  const directions = ["up", "down", "left", "right", "up", "down", "left", "right", "up", "down", "left", "right"];
  const sections = [
    <Hero key="hero" />,
    <About key="about" />,
    <Skills key="skills" />,
    <Projects key="projects" />,
    <Education key="education" />,
    <Experience key="experience" />,
    <Achievements key="achievements" />,
    <Contact key="contact" />,
    <MagicBento key="magic-bento" />,
    <CardSwap key="card-swap" />,
    <Footer key="footer" />
  ];

  return (
    <div style={{ overflowX: "hidden" }}>
      {sections.map((Section, idx) => (
        <motion.div
          key={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: idx % 2 === 0 ? 40 : -40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
        >
          {Section}
        </motion.div>
      ))}
    </div>
  );
}

function App() {
  const ClickSpark = ({
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
    children
  }) => {
    const canvasRef = useRef(null);
    const sparksRef = useRef([]);
    const startTimeRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      let resizeTimeout;

      const resizeCanvas = () => {
        const { width, height } = parent.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
      };

      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
      };

      const ro = new window.ResizeObserver(handleResize);
      ro.observe(parent);

      resizeCanvas();

      return () => {
        ro.disconnect();
        clearTimeout(resizeTimeout);
      };
    }, []);

    const easeFunc = useCallback(
      t => {
        switch (easing) {
          case 'linear':
            return t;
          case 'ease-in':
            return t * t;
          case 'ease-in-out':
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          default:
            return t * (2 - t);
        }
      },
      [easing]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      let animationId;

      const draw = timestamp => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparksRef.current = sparksRef.current.filter(spark => {
          const elapsed = timestamp - spark.startTime;
          if (elapsed >= duration) {
            return false;
          }

          const progress = elapsed / duration;
          const eased = easeFunc(progress);

          const distance = eased * sparkRadius * extraScale;
          const lineLength = sparkSize * (1 - eased);

          const x1 = spark.x + distance * Math.cos(spark.angle);
          const y1 = spark.y + distance * Math.sin(spark.angle);
          const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
          const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

          ctx.strokeStyle = sparkColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          return true;
        });

        animationId = requestAnimationFrame(draw);
      };

      animationId = requestAnimationFrame(draw);

      return () => {
        cancelAnimationFrame(animationId);
      };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

    const handleClick = e => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      }));

      sparksRef.current.push(...newSparks);
    };

    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }} onClick={handleClick}>
        {children}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999
          }}
        />
      </div>
    );
  };

  return (
    <Router>
      <ClickSpark>
        <div className="min-h-screen text-white font-sans">
          <Navbar />
          <main>
            <Routes>
              <Route path="/cv-upload" element={<CvUpload />} />
              {/* Add a catch-all route for 404s */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </ClickSpark>
    </Router>
  );
}

export default App;

