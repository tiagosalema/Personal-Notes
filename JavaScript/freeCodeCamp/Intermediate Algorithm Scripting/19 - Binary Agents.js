const binaryAgent = str => {
  return str
    .split(" ")
    .map(x =>
      x
        .split("")
        .reduce(
          (tot, b, i, str) => tot + Math.pow(2, str.length - i - 1) * parseInt(b),
          0
        )
    )
    .map(x => String.fromCharCode(x))
    .join("");
};

binaryAgent(
  "01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"
);
