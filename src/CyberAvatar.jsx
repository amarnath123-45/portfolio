import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CyberAvatar.css';

const CyberAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
      setTimeout(triggerGlitch, Math.random() * 5000 + 2000);
    };
    const timer = setTimeout(triggerGlitch, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`cyber-avatar-fixed ${glitchActive ? 'glitch-filter' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Glow Shell */}
      <div className="avatar-aura" />

      {/* Main Avatar Container */}
      <div className="avatar-container">
        <svg
          viewBox="0 0 160 160"
          className="avatar-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="neonBlue" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="#00f3ff" floodOpacity="0.8" result="color" />
              <feComposite in="color" in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonMagenta" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="#ff00ff" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0f0f1a" />
            </linearGradient>
          </defs>

          {/* Character Body (Torso UP) */}
          <g className="avatar-character">
            {/* Shoulders */}
            <path
              d="M30 140 Q40 100 80 100 Q120 100 130 140"
              fill="url(#metalGrad)"
              stroke="#00f3ff"
              strokeWidth="1.5"
            />
            {/* Neck */}
            <rect x="72" y="90" width="16" height="15" fill="#111" stroke="#ff00ff" strokeWidth="1" />

            {/* Head - Cyber Helmet Style */}
            <g className="head-group">
              <path
                d="M45 40 Q45 5 80 5 Q115 5 115 40 L115 85 Q115 100 100 105 L60 105 Q45 100 45 85 Z"
                fill="url(#metalGrad)"
                stroke="#00f3ff"
                strokeWidth="2"
                className={glitchActive ? 'svg-glitch' : ''}
              />

              {/* Visor Area */}
              <path d="M50 35 L110 35 L108 65 L52 65 Z" fill="#000" stroke="#ff00ff" strokeWidth="1.5" />

              {/* Cyber Eyes / Data Stream */}
              <AnimatePresence>
                {!isHovered ? (
                  <motion.g key="idle-eyes">
                    <rect x="58" y="42" width="15" height="4" fill="#00f3ff" filter="url(#neonBlue)">
                      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <rect x="87" y="42" width="15" height="4" fill="#00f3ff" filter="url(#neonBlue)">
                      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                    </rect>
                  </motion.g>
                ) : (
                  <motion.g
                    key="active-eyes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <rect x="58" y="42" width="15" height="12" rx="2" fill="#ff00ff" filter="url(#neonMagenta)" />
                    <rect x="87" y="42" width="15" height="12" rx="2" fill="#ff00ff" filter="url(#neonMagenta)" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Data Scanner Line */}
              <rect x="50" y="35" width="60" height="2" fill="#00f3ff" opacity="0.3">
                <animate attributeName="y" values="35;63;35" dur="3s" repeatCount="indefinite" />
              </rect>
            </g>

            {/* Floating Tech Bits around head */}
            {[...Array(3)].map((_, i) => (
              <circle
                key={i}
                cx={40 + i * 40}
                cy={20}
                r="1.5"
                fill="#00f3ff"
                filter="url(#neonBlue)"
              >
                <animate attributeName="opacity" values="0;1;0" dur={`${1 + i}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        </svg>
      </div>

      {/* Notification / Status UI */}
      <div className="avatar-ui">
        <div className="ui-line top" />
        <div className="status-container">
          <span className="status-dot green" />
          <span className="status-text">SYSTEM.ONLINE</span>
        </div>
        <div className="data-readout">
          <span className="scrolling-text">SCANNING_PROTOCOLS... 0x4F2A_VERIFIED... USER_RECOGNIZED...</span>
        </div>
        <div className="ui-line bottom" />
      </div>

      {/* Interactive Label on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="avatar-label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            &lt;GUIDE_MODE/&gt;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CyberAvatar;
