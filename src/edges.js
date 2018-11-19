const getEdges = (x, y, w, h, array) => {
  const topI = y - 1;
  const rightI = x + 1;
  const bottomI = y + 1;
  const leftI = x - 1;

  let edges = 0;

  if (topI >= 0 && array[x + w * topI] === 0) {
    edges = edges ^ 8;
  }

  if (rightI < w && array[rightI + w * y] === 0) {
    edges = edges ^ 4;
  }

  if (bottomI < h && array[x + w * bottomI] === 0) {
    edges = edges ^ 2;
  }

  if (leftI >= 0 && array[leftI + w * y] === 0) {
    edges = edges ^ 1;
  }

  return edges;
};

const createEdges = (array, w, h) => {
  return array.map((element, i, array) => {
    const x = i % w;
    const y = parseInt(i / h);
    if (element === 0) return element;

    const edge = getEdges(x, y, w, h, array);
    return edge;
  });
};

export { createEdges, getEdges };

// //prettier-ignore
// const test = [
//   1,0,1,0,
//   0,1,1,1,
//   0,0,0,1,
//   1,0,1,1,
// ];

// const w = Math.sqrt(test.length);
// const h = Math.sqrt(test.length);

// const result = createEdges(test, w, h);
// print(result);

// function print(result) {
//   for (let i = 0; i < w; i++) {
//     let row = "";
//     for (let j = 0; j < h; j++) {
//       row += result[i * w + j] + ", ";
//     }
//     console.log(`${row}\n`);
//   }
// }
