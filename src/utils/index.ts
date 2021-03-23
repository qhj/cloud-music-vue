export const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000)
  const remainder = seconds % 60
  const minutes = (seconds - remainder) / 60
  return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`
}
