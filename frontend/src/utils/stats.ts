export const calculateMean = (times: number[]) => {
  if (times.length === 0) return null;
  const sum = times.reduce((a, b) => a + b, 0);
  return sum / times.length;
};

export const calculateAoN = (times: number[], n: number) => {
  if (times.length < n) return null;
  const recentTimes = times.slice(0, n);
  
  if (n < 5) {
    return calculateMean(recentTimes);
  }
  
  // Trimmed mean: remove best and worst
  const sorted = [...recentTimes].sort((a, b) => a - b);
  const trimmed = sorted.slice(1, -1);
  return calculateMean(trimmed);
};
