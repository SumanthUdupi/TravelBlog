import React, { useEffect, useState } from 'react';

const CurtainLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for window load
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 800); // Minimum presence for impact
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <div className={`curtain-loader ${!isLoading ? 'open' : ''}`}>
            <div className="curtain-panel left"></div>
            <div className="curtain-panel right"></div>

            <style>{`
                .curtain-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    z-index: 10000;
                    pointer-events: none;
                    display: flex;
                }

                .curtain-panel {
                    flex: 1;
                    height: 100%;
                    background: #000; /* Void Black */
                    transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1);
                    transform-origin: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .curtain-panel.left {
                    transform-origin: left;
                }
                
                .curtain-panel.right {
                    transform-origin: right;
                }

                /* Text/Logo could go here inside panels if needed */

                .curtain-loader.open .curtain-panel.left {
                    transform: translateX(-100%);
                }

                .curtain-loader.open .curtain-panel.right {
                    transform: translateX(100%);
                }
            `}</style>
        </div>
    );
};

export default CurtainLoader;
