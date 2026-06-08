import React, { useEffect, useRef } from 'react';

const ParticleWave = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const camPos = useRef({ x: 0, y: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Support high-DPI displays for crisp particles
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      // Normalize mouse between -1 and 1
      mouse.current.x = (e.clientX / width) * 2 - 1;
      mouse.current.y = (e.clientY / height) * 2 - 1;

      // Check if hovering over interactive elements during mouse move
      const isInteractive =
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.closest('a') ||
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.closest('button') ||
        e.target.classList?.contains('project-card');

      isHoveringRef.current = !!isInteractive;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle Grid Settings
    const SEPARATION = 100; // Distance between dots
    const AMOUNTX = 50;   // Number of dots in X
    const AMOUNTY = 50;   // Number of dots in Z

    let count = 0;

    const render = () => {
      // Clear background with site's dark primary color
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Keep the camera completely static
      const camX = 0;
      const camY = 200;
      const camZ = 1000;

      // Tilt camera slightly down to look at the wave
      const angleX = -Math.PI / 6; // Look down a bit steeper
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const points2d = [];

      // Mouse position in actual pixels
      const mousePxX = ((mouse.current.x + 1) / 2) * width;
      const mousePxY = ((mouse.current.y + 1) / 2) * height;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        points2d[ix] = [];
        for (let iy = 0; iy < AMOUNTY; iy++) {

          // Base 3D coordinates
          let px = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
          let pz = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);

          // Generate wave height using combinations of sine waves
          let py = Math.sin((ix + count) * 0.3) * 80 +
            Math.sin((iy + count) * 0.4) * 80;

          // Camera offset translation
          let vx = px - camX;
          let vy = py - camY;
          let vz = pz - camZ;

          // Camera rotation
          let finalY = vy * cosX - vz * sinX;
          let finalZ = vy * sinX + vz * cosX;
          let finalX = vx;

          // Don't render points behind camera
          if (finalZ >= -10) {
            points2d[ix][iy] = null;
            continue;
          }

          // Perspective Projection
          const fov = 700;
          const scale = fov / (fov - finalZ);

          let x2d = (finalX * scale) + (width / 2);
          let y2d = (finalY * scale) + (height / 2) + 250;

          // Local Scatter Effect on Hover
          const dx = x2d - mousePxX;
          const dy = y2d - mousePxY;
          const distSq = dx * dx + dy * dy;
          const hoverRadius = 180;
          const hoverRadiusSq = 32400; // 180 * 180
          let scatterGlow = 1;

          if (distSq < hoverRadiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow((hoverRadius - dist) / hoverRadius, 1.5); // 0 to 1 curve

            // Push outwards radially
            x2d += (dx / dist) * force * 70;
            y2d += (dy / dist) * force * 70;

            // Add chaotic jitter
            x2d += Math.sin(count * 15 + ix * 2) * force * 20;
            y2d += Math.cos(count * 15 + iy * 2) * force * 20;

            scatterGlow = 1 + force * 1.2; // Make scattered particles slightly brighter
          }

          // Fade out distant dots
          const distance = Math.abs(finalZ);
          let opacity = Math.max(0.05, Math.min(1, 1.2 - (distance / 4500)));
          opacity = Math.min(1, opacity * scatterGlow);

          points2d[ix][iy] = { x: x2d, y: y2d, scale: scale, opacity: opacity };
        }
      }

      // PERFORMANCE OPTIMIZATION: Consolidate rendering to minimize draw calls

      // 1. Draw horizontal connecting ribbons in ONE path
      ctx.beginPath();
      for (let ix = 0; ix < AMOUNTX; ix++) {
        let started = false;

        for (let iy = 0; iy < AMOUNTY; iy++) {
          const pt = points2d[ix][iy];
          if (pt && pt.opacity > 0.05 && pt.x > 0 && pt.x < width && pt.y > 0 && pt.y < height) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
      }
      ctx.strokeStyle = `rgba(0, 243, 255, 0.1)`; // Very faint cyan ribbon
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Draw the crosshair (+) particles in ONE path
      ctx.beginPath();
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const pt = points2d[ix][iy];
          if (pt && pt.opacity > 0.05 && pt.x > 0 && pt.x < width && pt.y > 0 && pt.y < height) {
            const r = Math.max(1, 4 * pt.scale); // Size of the cross

            // Draw a "+" sign
            ctx.moveTo(pt.x - r, pt.y);
            ctx.lineTo(pt.x + r, pt.y);
            ctx.moveTo(pt.x, pt.y - r);
            ctx.lineTo(pt.x, pt.y + r);
          }
        }
      }
      ctx.strokeStyle = `rgba(0, 243, 255, 0.3)`; // Uniform opacity for massive performance gain
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Draw highlighted points in ONE path
      ctx.beginPath();
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const pt = points2d[ix][iy];
          if (pt && pt.opacity > 0.05 && pt.x > 0 && pt.x < width && pt.y > 0 && pt.y < height) {
            // Occasionally draw a highlighted point
            if ((ix + iy) % 11 === 0) {
              ctx.rect(pt.x - 1, pt.y - 1, 2, 2);
            }
          }
        }
      }
      ctx.fillStyle = `rgba(255, 0, 255, 0.8)`; // Neon pink highlight
      ctx.fill();

      count += 0.035; // Wave animation speed
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -5,
        pointerEvents: 'none',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default ParticleWave;
