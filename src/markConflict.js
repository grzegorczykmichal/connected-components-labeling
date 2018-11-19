const markConflict = (x, y, list) => {
  let a = resolve(x, list, []);
  let b = resolve(y, list, []);

  if (!list.hasOwnProperty(a)) {
    list[a] = Math.min(a, b);
  }

  list[a] = Math.min(list[a], Math.min(a, b));

  if (!list.hasOwnProperty(b)) {
    list[b] = Math.min(a, b);
  }

  list[b] = Math.min(list[b], Math.min(a, b));

  return list;
};

const resolve = (a, list, circular) => {
  if (!(a in list)) return a;

  if (circular.includes(a)) {
    return Math.min.apply(Math, circular);
  }

  return resolve(list[a], list, circular.concat([a]));
};

// const a = markConflict(3, 1, { 3: 2, 2: 3 });

const g = {
  1: 1,
  2: 1,
  3: 2,
  5: 3
};

console.log(resolve(5, g, []));
