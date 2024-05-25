import { useMemo } from 'react';

export const useGenerateMinutes = () => {
    const times = useMemo(() => {
        const generatedTimes = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                generatedTimes.push({ time: formattedTime, value: minute + (hour*60) });
            }
        }
        return generatedTimes;
    }, []);

    return times;
};