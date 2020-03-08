const arr = [8, 3, 4, 6, 1, 2, 3];

const tree = nrs => {
  /**
   * left_pointers = [
   *    [
   *      nr to which nrs[0] is left-pointing to,
   *      the index of that nr in nrs
   *    ],
   *    [
   *      nr to which nrs[1] is left-pointing to,
   *      the index of that nr in nrs
   *    ],
   *    ...
   *  ];
   * right_pointers = (idem)
   */
  const left_pointers = new Array(nrs.length).fill([0, 0]);
  const right_pointers = new Array(nrs.length).fill([0, 0]);

  let i; // iterates through the nrs

  for (let current = 1; current < nrs.length; current++) {
    i = 0;
    while (1) {
      // if current nr is smaller
      if (nrs[current] < nrs[i]) {
        if (left_pointers[i][1] == 0) {
          left_pointers[i] = [nrs[current], current];
          break;
        } else {
          i = left_pointers[i][1];
        }
      }
      // if current nr is bigger
      else if (nrs[current] > nrs[i]) {
        if (right_pointers[i][1] == 0) {
          right_pointers[i] = [nrs[current], current];
          break;
        } else {
          i = right_pointers[i][1];
        }
      }
      // if current nr is equal
      else {
        left_pointers[current] = left_pointers[i];
        right_pointers[current] = right_pointers[i];
        break;
      }
    }
  }
  return [left_pointers, right_pointers];
};

console.log(tree(arr));
