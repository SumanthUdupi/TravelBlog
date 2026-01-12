import React, { useRef, useEffect } from 'react';

const KineticHero = ({ text = "The Æsthetic" }) => {
    const containerRef = useRef(null);
    const spansRef = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            spansRef.current.forEach((span) => {
                if (!span) return;
                const rect = span.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const distX = mouseX - charX;
                const distY = mouseY - charY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                // Max distance to affect characters
                const maxDist = 300;

                if (distance < maxDist) {
                    const power = (maxDist - distance) / maxDist;
                    const moveX = -(distX / distance) * power * 40; // 40px max movement
                    const moveY = -(distY / distance) * power * 40;

                    span.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    span.style.fontWeight = 400 + (power * 400); // 400 -> 800
                    span.style.color = `rgb(${10 + power * 50}, ${17 + power * 50}, ${40 + power * 200})`; // Shift to blue
                } else {
                    span.style.transform = `translate(0px, 0px)`;
                    span.style.fontWeight = 400;
                    span.style.color = 'var(--color-text-main)';
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="kinetic-hero" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', cursor: 'default' }}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    ref={el => spansRef.current[i] = el}
                    style={{
                        display: 'inline-block',
                        transition: 'transform 0.1s ease-out, font-weight 0.2s, color 0.2s',
                        fontSize: 'min(15vw, 6rem)',
                        fontFamily: 'var(--font-display)',
                        willChange: 'transform, font-weight',
                        lineHeight: 1
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};

export default KineticHero;
