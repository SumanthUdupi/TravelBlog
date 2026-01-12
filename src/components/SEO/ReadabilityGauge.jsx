import React from 'react';

const ReadabilityGauge = ({ score }) => {
    // Score 0-100
    const radius = 40;
    const stroke = 8;
    const normalizedScore = Math.max(0, Math.min(100, score));
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

    let color = '#d45e5e'; // Red
    if (normalizedScore > 50) color = '#d4af37'; // Gold
    if (normalizedScore > 80) color = '#2d8a56'; // Green

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                {/* Background Circle */}
                <svg height="100" width="100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        stroke="#e6e6e6"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={radius}
                        cx="50"
                        cy="50"
                    />
                    {/* Progress Circle */}
                    <circle
                        stroke={color}
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="50"
                        cy="50"
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: 'var(--color-text-main)'
                }}>
                    {Math.round(normalizedScore)}
                </div>
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                SEO Score
            </span>
        </div>
    );
};

export default ReadabilityGauge;
