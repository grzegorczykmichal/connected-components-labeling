const scaner = (array, w, h) => {
  let lastLabel = 0;
  const regions = {};
  const scannedArray = new Array(w * h);
  const labeledArray = new Array(w * h);
  return {
    firstScan: () => {
      lastLabel = 0;
      for (let i = 0; i < scannedArray.length; i++) {
        if (array[i] == 0) {
          scannedArray[i] = 0;
          continue;
        }

        const [x, y] = getXY(i, w, h);

        const adjacents = getAdjacent(x, y, w, h, scannedArray);

        const labels = adjacents.filter(a => a);

        if (labels.length == 0) {
          scannedArray[i] = [++lastLabel];
        } else {
          scannedArray[i] = labels;
        }

        scannedArray[i].forEach(l => {
          if (!(l in regions)) {
            regions[l] = [];
          }
          regions[l] = regions[l].concat(scannedArray[i]).filter(onlyUnique);
        });
      }
      return [scannedArray, lastLabel, regions];
    },

    secondScan: () => {
      for (let i = 0; i < scannedArray.length; i++) {
        if (Array.isArray(scannedArray[i])) {
          const key = Math.min(...scannedArray[i]);
          if (key in regions) {
            labeledArray[i] = Math.min(...regions[key]);
          }
        } else {
          labeledArray[i] = 0;
        }
      }
      return labeledArray;
    }
  };
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const getXY = (i, w, h) => [i % w, Math.trunc(i / h)];
const getI = (x, y, w) => y * w + x;

const getAdjacent = (x, y, w, h, a) => {
  let adjacents = [];
  [getI(x, y - 1, w), getI(x - 1, y, w)].forEach(i => {
    if (i > 0 && i < a.length) {
      const l = a[i];
      if (Array.isArray(l)) {
        adjacents = adjacents.concat(a[i]);
      } else {
        adjacents.push(a[i]);
      }
    }
  });
  return adjacents;
};

export { scaner };
