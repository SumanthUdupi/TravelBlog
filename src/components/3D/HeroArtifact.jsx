import React, { useEffect, useRef } from 'react';

const HeroArtifact = () => {
  // CSS-only 3D Prism
  return (
    <div className="artifact-container" style={{
      perspective: '1200px',
      width: '300px',
      height: '300px',
      position: 'relative',
      transformStyle: 'preserve-3d'
    }}>
      <style>{`
        @keyframes float-spin {
          0% { transform: rotateX(15deg) rotateY(0deg) translateY(0px); }
          50% { transform: rotateX(10deg) rotateY(180deg) translateY(-20px); }
          100% { transform: rotateX(15deg) rotateY(360deg) translateY(0px); }
        }
        
        .prism-core {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 25%;
          left: 25%;
          transform-style: preserve-3d;
          animation: float-spin 15s infinite linear reverse;
        }

        .prism-outer {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: float-spin 25s infinite linear;
        }

        .face {
          position: absolute;
          border: 1px solid var(--color-accent);
          background: rgba(212, 175, 55, 0.03);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
          backface-visibility: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }

        .face:hover {
            background: rgba(212, 175, 55, 0.2);
            box-shadow: 0 0 40px var(--color-accent-glow);
        }

        /* Cube Math */
        .outer-face { width: 300px; height: 300px; }
        .inner-face { width: 150px; height: 150px; border-color: var(--color-text-main); }
        
        .outer-face:nth-child(1) { transform: rotateY(0deg) translateZ(150px); }
        .outer-face:nth-child(2) { transform: rotateY(90deg) translateZ(150px); }
        .outer-face:nth-child(3) { transform: rotateY(180deg) translateZ(150px); }
        .outer-face:nth-child(4) { transform: rotateY(-90deg) translateZ(150px); }
        .outer-face:nth-child(5) { transform: rotateX(90deg) translateZ(150px); }
        .outer-face:nth-child(6) { transform: rotateX(-90deg) translateZ(150px); }

        .inner-face:nth-child(1) { transform: rotateY(0deg) translateZ(75px); }
        .inner-face:nth-child(2) { transform: rotateY(90deg) translateZ(75px); }
        .inner-face:nth-child(3) { transform: rotateY(180deg) translateZ(75px); }
        .inner-face:nth-child(4) { transform: rotateY(-90deg) translateZ(75px); }
        .inner-face:nth-child(5) { transform: rotateX(90deg) translateZ(75px); }
        .inner-face:nth-child(6) { transform: rotateX(-90deg) translateZ(75px); }

      `}</style>

      {/* Inner Core Cube */}
      <div className="prism-core">
        {[...Array(6)].map((_, i) => (
          <div key={`inner-${i}`} className="face inner-face"></div>
        ))}
      </div>

      {/* Outer Shell Cube */}
      <div className="prism-outer">
        {['I', 'M', 'P', 'E', 'R', 'I'].map((char, i) => (
          <div key={`outer-${i}`} className="face outer-face">
            <span style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>{char}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroArtifact;
