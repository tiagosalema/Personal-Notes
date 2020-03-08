const checkCashRegister = (price, cash, cid) => {
  // cid = cash in drawer
  // push the amount of each currency into cid
  [0.01, 0.05, 0.1, 0.25, 1.0, 5.0, 10.0, 20.0, 100.0].forEach((val, i) => {
    cid[i].push(val);
    cid[i][1].toFixed(2);
  });

  const reqChange = cash - price;
  const available = cid.reduce((tot, coin) => tot + coin[1], 0).toFixed(2);
  let change = [["", 0]];
  let changeSum = 0;

  if (reqChange > available) return { status: "INSUFFICIENT_FUNDS", change: [] };
  let coin = 0;
  for (let i = cid.length - 1; i >= 0; i--) {
    // iterate through all the currencies
    if (reqChange >= cid[i][2]) {
      // while there are coins of i and 1 extra i <= reqChange
      while (cid[i][1] && changeSum + cid[i][2] <= reqChange + 0.009) {
        if (change[coin][0] !== cid[i][0]) {
          // if the change doens't have the coin to be added
          change.push(["", 0]);
          coin++;
        }
        change[coin][0] = cid[i][0];
        change[coin][1] += cid[i][2];
        cid[i][1] -= cid[i][2];
        changeSum = change.reduce((tot, coin) => tot + coin[1], 0);
      }
    }
  }
  change.shift(0);
  if (changeSum.toFixed(2) !== reqChange.toFixed(2))
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  if (reqChange.toFixed(2) === available) {
    cid.forEach((v, i) => {
      if (!change[i]) {
        change[i] = [v[0], 0];
      } else change[i][1] = change[i][1].toFixed(1) / 1; // correct the 0.00000000001
    });
    return { status: "CLOSED", change };
  }
  return { status: "OPEN", change };
};
checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
