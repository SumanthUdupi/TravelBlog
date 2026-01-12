import React, { useEffect, useRef } from 'react';

const LiquidCursor = () => {
    const cursorRef = useRef(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const requestRef = useRef();

    useEffect(() => {
        const handleMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            // Linear interpolation for smooth "lag"
            positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.1;
            positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.1;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <>
            <style>{`
        .liquid-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          border: 1px solid var(--color-accent);
          background: rgba(212, 175, 55, 0.1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          backdrop-filter: blur(2px);
          transition: width 0.3s, height 0.3s, background-color 0.3s;
        }
        
        /* Hide on mobile/touch */
        @media (hover: none) and (pointer: coarse) {
          .liquid-cursor {
            display: none;
          }
        }

        body:hover .liquid-cursor {
           opacity: 1;
        }
      `}</style>
            <div ref={cursorRef} className="liquid-cursor" />
        </>
    );
};

export default LiquidCursor;
