import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';
import logo4 from '../images/logo4.png';
import logo5 from '../images/logo5.png';
import logo6 from '../images/logo6.png';
import logo7 from '../images/logo7.png';
import logo8 from '../images/logo8.png';
import logo9 from '../images/logo9.png';
import logo10 from '../images/logo10.png';
import logo11 from '../images/logo11.png';
import logo12 from '../images/logo12.png';

const Hero = () => {
  const [dots, setDots] = useState([]);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Logo array for easy mapping
  const logos = [
    logo1, logo2, logo3, logo4, logo5, logo6,
    logo7, logo8, logo9, logo10, logo11, logo12
  ];

  useEffect(() => {
    // Generate dots in hexagonal/geometric pattern
    const generateDots = () => {
      const newDots = [];
      
      // Center dot
      newDots.push({
        id: 'center',
        x: 0,
        y: 0,
        layer: 0,
        delay: 0,
        angle: 0
      });

      // Inner hexagon (layer 1) - 6 dots
      const innerRadius = 40;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        newDots.push({
          id: `inner-${i}`,
          x: Math.cos(angle) * innerRadius,
          y: Math.sin(angle) * innerRadius,
          layer: 1,
          delay: 0.2 + i * 0.1,
          angle: angle
        });
      }

      // Middle layer (layer 2) - 12 dots in hexagonal pattern
      const middleRadius = 80;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        newDots.push({
          id: `middle-${i}`,
          x: Math.cos(angle) * middleRadius,
          y: Math.sin(angle) * middleRadius,
          layer: 2,
          delay: 0.5 + i * 0.05,
          angle: angle
        });
      }

      // Outer hexagonal vertices (layer 3) - 6 main points
      const outerRadius = 120;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        newDots.push({
          id: `outer-${i}`,
          x: Math.cos(angle) * outerRadius,
          y: Math.sin(angle) * outerRadius,
          layer: 3,
          delay: 0.8 + i * 0.1,
          angle: angle
        });
      }

      // Extended outer points (layer 4) - scattered points
      const extendedPositions = [
        { x: -140, y: -80, delay: 1.2 },
        { x: -140, y: 0, delay: 1.25 },
        { x: -140, y: 80, delay: 1.3 },
        { x: 140, y: -80, delay: 1.35 },
        { x: 140, y: 0, delay: 1.4 },
        { x: 140, y: 80, delay: 1.45 },
        { x: 0, y: -140, delay: 1.5 },
        { x: 0, y: 140, delay: 1.55 },
        { x: -70, y: -120, delay: 1.6 },
        { x: 70, y: -120, delay: 1.65 },
        { x: -70, y: 120, delay: 1.7 },
        { x: 70, y: 120, delay: 1.75 }
      ];

      extendedPositions.forEach((pos, i) => {
        newDots.push({
          id: `extended-${i}`,
          x: pos.x,
          y: pos.y,
          layer: 4,
          delay: pos.delay,
          angle: Math.atan2(pos.y, pos.x)
        });
      });
      
      setDots(newDots);
    };

    generateDots();

    // Animation phase cycling
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(phaseInterval);
  }, []);

  // Generate connection lines for geometric phase
  const generateConnections = () => {
    const connections = [];
    
    // Connect inner hexagon
    for (let i = 0; i < 6; i++) {
      const current = dots.find(d => d.id === `inner-${i}`);
      const next = dots.find(d => d.id === `inner-${(i + 1) % 6}`);
      if (current && next) {
        connections.push({
          id: `inner-ring-${i}`,
          x1: current.x, y1: current.y,
          x2: next.x, y2: next.y,
          type: 'inner'
        });
      }
    }

    // Connect outer hexagon
    for (let i = 0; i < 6; i++) {
      const current = dots.find(d => d.id === `outer-${i}`);
      const next = dots.find(d => d.id === `outer-${(i + 1) % 6}`);
      if (current && next) {
        connections.push({
          id: `outer-ring-${i}`,
          x1: current.x, y1: current.y,
          x2: next.x, y2: next.y,
          type: 'outer'
        });
      }
    }

    // Connect inner to outer (radial lines)
    for (let i = 0; i < 6; i++) {
      const inner = dots.find(d => d.id === `inner-${i}`);
      const outer = dots.find(d => d.id === `outer-${i}`);
      if (inner && outer) {
        connections.push({
          id: `radial-${i}`,
          x1: inner.x, y1: inner.y,
          x2: outer.x, y2: outer.y,
          type: 'radial'
        });
      }
    }

    // Connect center to inner hexagon
    const center = dots.find(d => d.id === 'center');
    if (center) {
      for (let i = 0; i < 6; i++) {
        const inner = dots.find(d => d.id === `inner-${i}`);
        if (inner) {
          connections.push({
            id: `center-${i}`,
            x1: center.x, y1: center.y,
            x2: inner.x, y2: inner.y,
            type: 'center'
          });
        }
      }
    }

    return connections;
  };

  const connections = generateConnections();

  // Color schemes for different phases
  const getColorForPhase = (phase, layer) => {
    switch (phase) {
      case 0: // Expanding dots - all black
        return '#000000';
      case 1: // Colored circles
        if (layer === 0) return '#000000'; // center stays black
        if (layer === 1) return '#000000'; // inner ring black
        if (layer === 2) return '#8b5cf6'; // middle purple
        if (layer === 3) return '#ff6b6b'; // outer red
        if (layer === 4) return '#4ecdc4'; // extended blue
        return '#6366f1';
      case 2: // Geometric network
        if (layer === 0) return '#000000';
        if (layer === 1) return '#000000';
        if (layer === 2) return '#8b5cf6';
        if (layer === 3) return '#ff6b6b';
        if (layer === 4) return '#4ecdc4';
        return '#8b5cf6';
      default:
        return '#000000';
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Left side - Animated Dot Pattern */}
          <motion.div 
            className="hero-animation"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="dot-animation-container">
              <svg width="400" height="400" viewBox="-200 -200 400 400" className="dot-svg">
                {/* Animated dots */}
                <AnimatePresence>
                  {dots.map((dot) => (
                    <motion.circle
                      key={dot.id}
                      cx={dot.x}
                      cy={dot.y}
                      r={dot.layer === 0 ? 6 : 4}
                      initial={{ 
                        scale: 0, 
                        opacity: 0,
                        fill: '#000000'
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        fill: getColorForPhase(animationPhase, dot.layer)
                      }}
                      transition={{
                        delay: dot.delay,
                        duration: 0.6,
                        ease: "easeOut",
                        fill: {
                          duration: 0.8,
                          ease: "easeInOut"
                        }
                      }}
                      style={{
                        filter: `drop-shadow(0 0 ${dot.layer === 0 ? 8 : 6}px ${getColorForPhase(animationPhase, dot.layer)}40)`
                      }}
                    />
                  ))}
                </AnimatePresence>

                {/* Connection lines for geometric phase */}
                {animationPhase === 2 && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    {connections.map((connection, index) => (
                      <motion.line
                        key={connection.id}
                        x1={connection.x1}
                        y1={connection.y1}
                        x2={connection.x2}
                        y2={connection.y2}
                        stroke={
                          connection.type === 'inner' ? '#000000' :
                          connection.type === 'center' ? '#000000' :
                          connection.type === 'outer' ? '#ff6b6b' :
                          '#8b5cf6'
                        }
                        strokeWidth={connection.type === 'center' ? 1 : 1.5}
                        strokeDasharray={
                          connection.type === 'inner' ? '1,3' :
                          connection.type === 'center' ? '1,2' :
                          connection.type === 'outer' ? '2,4' :
                          '1,3'
                        }
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{
                          delay: 2 + index * 0.05,
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.g>
                )}
              </svg>
              
              {/* Floating background particles */}
              <motion.div
                className="bg-particle bg-particle-1"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 8, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="bg-particle bg-particle-2"
                animate={{
                  y: [0, 12, 0],
                  x: [0, -10, 0],
                  opacity: [0.15, 0.4, 0.15]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>

          {/* Right side - Text Content */}
          <div className="hero-text">
            <div className="hero-titles">
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Design
              </motion.h1>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform
              </motion.h1>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Accelerate
              </motion.h1>
            </div>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Redefining user experiences through Behavioural Science & AI
            </motion.p>
          </div>
        </div>
      </div>

      {/* Client Section */}
      <motion.div
        className="client-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="container-fluid">
          <div className="client-content">
            <div className="client-text">
              <p>Your trusted UI UX design agency.</p>
            </div>
            <div className="client-logos-container">
              <div className="client-logos-scroll">
                {/* First set of logos */}
                {logos.map((logo, index) => (
                  <div key={`logo-${index}`} className="logo-item">
                    <img src={logo} alt={`Client ${index + 1}`} />
                  </div>
                ))}
                {/* Duplicate set for seamless scrolling */}
                {logos.map((logo, index) => (
                  <div key={`logo-duplicate-${index}`} className="logo-item">
                    <img src={logo} alt={`Client ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
