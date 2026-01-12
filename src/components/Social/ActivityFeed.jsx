import React, { useState, useEffect } from 'react';

const mockEvents = [
    "Architect_X liked 'The Golden Ratio'",
    "New comment on 'Sacred Geometry'",
    "Design_Lover joined the community",
    "Traveler_01 bookmarked 'Hidden Temples'",
    "Editor posted 'The Future of Digital Art'"
];

const ActivityFeed = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Initial seed
        setActivities(mockEvents.slice(0, 3).map((text, i) => ({ id: i, text, time: 'Just now' })));

        const interval = setInterval(() => {
            const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
            const newActivity = {
                id: Date.now(),
                text: randomEvent,
                time: 'Just now'
            };
            setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
        }, 5000); // New event every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="activity-feed glass-panel">
            <style>{`
                .activity-feed {
                    padding: var(--space-md);
                    margin-top: var(--space-2xl);
                }
                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    padding: 8px 0;
                    border-bottom: 1px solid var(--glass-border);
                    font-size: 0.9rem;
                    animation: slideIn 0.3s ease-out;
                }
                .activity-dot {
                    width: 8px;
                    height: 8px;
                    background: var(--color-accent);
                    border-radius: 50%;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                Community Pulse
            </h4>

            {activities.map(activity => (
                <div key={activity.id} className="activity-item">
                    <div className="activity-dot"></div>
                    <span>{activity.text}</span>
                </div>
            ))}
        </div>
    );
};

export default ActivityFeed;
