const scale = (a, b, minX, maX) => x => {
  return (b - a) * ((x - minX) / (maX - minX)) + a;
};

export { scale };
