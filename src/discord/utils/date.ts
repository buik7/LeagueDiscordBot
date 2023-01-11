export const msToTime = (duration: number) => {
  const milliseconds = (duration % 1000) / 100;
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return {
    h: hours,
    m: minutes,
    s: seconds,
    ml: milliseconds,
  };
};
