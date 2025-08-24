export const getProgressColor = (percent: number) => {
  if (percent >= 80) return '#4CAF50';      // green
  if (percent >= 50) return '#FFC107';      // amber
  if (percent >= 20) return '#FF9800';      // orange
  return '#2dc04cff';                         // red
};