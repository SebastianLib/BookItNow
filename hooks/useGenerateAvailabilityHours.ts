import { useMemo } from 'react';

export const useGenerateAvailabilityHours = () => {
    const times = useMemo(() => {
        const generatedTimes = [];
        for (let hour = 6; hour <= 23; hour++) {
                generatedTimes.push({ time: hour+":00", value: (hour*60) });
        }
        return generatedTimes;
    }, []);

    return times;
};