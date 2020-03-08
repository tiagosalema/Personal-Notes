const palindrome = str => {
  const newStr = str
    .replace(/[\W_]/g, "")
    .toLowerCase()
    .split("");
  for (let i = 0; i < newStr.length / 2; i++) {
    if (newStr[i] !== newStr[newStr.length - i - 1]) return false;
  }
  return true;
};
