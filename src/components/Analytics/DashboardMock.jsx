import React, { useState, useEffect } from 'react';

const DashboardMock = () => {
    const [visitors, setVisitors] = useState(124);
    const [readTime, setReadTime] = useState(4.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisitors(prev => prev + Math.floor(Math.random() * 3) - 1);
            setReadTime(prev => parseFloat((prev + (Math.random() * 0.1 - 0.05)).toFixed(1)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const StatCard = ({ label, value, color }) => (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{label}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: color }}>{value}</span>
        </div>
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '1rem', background: 'rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>● Live Server Logs: Monitoring Active Sessions</span>
            </div>
            <StatCard label="Live Visitors" value={visitors} color="var(--color-primary)" />
            <StatCard label="Avg Read Time" value={`${readTime}m`} color="var(--color-accent)" />
            <StatCard label="Engagement" value="High" color="#2d8a56" />
        </div>
    );
};

export default DashboardMock;
