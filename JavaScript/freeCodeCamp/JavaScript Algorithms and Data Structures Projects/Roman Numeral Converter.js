function convert(num) {
  let roman = [["I", "V"], ["X", "L"], ["C", "D"], ["M", "M"]];
  let fragmented = num
    .toString()
    .split("")
    .map(x => parseFloat(x))
    .map(x => (x > 5 ? [5, x - 5] : x)) // in groups w/ max = 5
    .map((y, i, arr) => {
      if (Array.isArray(y)) {
        if (y[1] < 4)
          return roman[arr.length - i - 1][1] + roman[arr.length - i - 1][0].repeat(y[1]);
        else if (y[1] === 4)
          return (roman[arr.length - i - 1][0] + roman[arr.length - i][0]).replace(
            ",",
            ""
          );
      } else if (y === 4)
        return roman[arr.length - i - 1][0] + roman[arr.length - i - 1][1];
      else if (y === 5) return roman[arr.length - i - 1][1];
      return roman[arr.length - i - 1][0].repeat(y);
    });
  return fragmented.toString();
}

const convertToRoman = n => {
  let arr = convert(n);
  for (let i = 0; i <= arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr.splice(i, 1, ...arr[i]);
      i--;
    }
  }
  return arr.replace(/,/g, "");
};

console.log(convertToRoman(400));
