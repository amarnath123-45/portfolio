import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const trailRefs = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const trail = useRef(Array(15).fill({ x: -100, y: -100 }));
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateTrail = () => {
      let x = mouse.current.x;
      let y = mouse.current.y;

      trail.current.forEach((pt, index) => {
        // Fluid trailing effect
        pt.x += (x - pt.x) * 0.35;
        pt.y += (y - pt.y) * 0.35;
        x = pt.x;
        y = pt.y;

        if (trailRefs.current[index]) {
          const scale = (trail.current.length - index) / trail.current.length;
          // Offset by -3px to center the 6x6 dots behind the pointer
          trailRefs.current[index].style.transform = `translate(${pt.x - 3}px, ${pt.y - 3}px) scale(${scale})`;
        }
      });

      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="dots-container">
      {trail.current.map((_, index) => (
        <div
          key={index}
          ref={(el) => (trailRefs.current[index] = el)}
          className="dot-trail"
        />
      ))}
    </div>
  );
};

export default Cursor;
