const arr = [8, 3, 4, 6, 1, 10, 10];

const tree = nrs => {
  // BT = Binary Tree
  let BT = {
    [nrs[0]]: [0, 0]
  };
  let tree_nr;
  const execute = (nr_i, pos) => {
    let do_break = false;
    debugger;
    if (BT[tree_nr][pos] == 0) {
      BT[tree_nr][pos] = nrs[nr_i];
      do_break = true;
    } else tree_nr = BT[tree_nr][pos];
    return do_break;
  };
  for (let nr_i = 1; nr_i < nrs.length; nr_i++) {
    BT[nrs[nr_i]] = [0, 0];
    // start in the origin
    tree_nr = nrs[0];
    let do_break = false;
    let j = 0;

    while (1) {
      if (nrs[nr_i] < tree_nr) do_break = execute(nr_i, 0);
      else if (nrs[nr_i] > tree_nr) do_break = execute(nr_i, 1);
      else do_break = true;
      if (do_break) break;
    }
  }
  return BT;
};

console.log(tree(arr));
