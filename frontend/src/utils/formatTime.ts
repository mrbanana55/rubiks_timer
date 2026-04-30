export const formatTime = (ms: number): string => {
  if (ms === 0) return "0.00";
  const seconds = Math.floor(ms / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  
  if (seconds < 60) {
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
};
