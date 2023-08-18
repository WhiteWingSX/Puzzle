import React, { useState, useEffect } from 'react';

const Stopwatch = (isActive) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, seconds]);

    return (
        <div>
                <span>{(seconds / 3600).toFixed(0).padStart(2, '0')}:</span>
                <span>{((seconds / 60) % 60).toFixed(0).padStart(2, '0')}:</span>
                <span>{(seconds % 60).toFixed(0).padStart(2, '0')}</span>
        </div>
    );
};

export default Stopwatch;