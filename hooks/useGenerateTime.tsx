
export const useGenerateTime= (time:number) => {
    return (Math.floor(time/60) + ":" + (time % 60 === 0 ? "00" : time % 60));
};