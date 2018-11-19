const ipath = (a, b, cfg) => {
  const xs = a[0];
  const xe = b[0];
  const x1 = r(xs, xe);
  const x2 = r(x1, xe);

  const ys = a[1];
  const ye = b[1];
  const y1 = r(ys, ye);
  const y2 = r(y1, ye);

  return [a, [x1 + r(5, 10), y1 + r(5, 10)], [x2 + r(5, 10), y2 + r(5, 10)], b];
};

function r(min, max) {
  return Math.random() * (max - min) + min;
}

export { ipath };
