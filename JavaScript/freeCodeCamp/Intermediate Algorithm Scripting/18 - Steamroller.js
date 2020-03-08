const steamrollArray = arr => {
  for (let i = 0; i <= arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr.splice(i, 1, ...arr[i]);
      i--;
    }
  }
  return arr;
};

steamrollArray([1, [2], [3, [[4]]]]);
