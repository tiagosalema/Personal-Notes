const truthCheck = (collection, pre) => {
  for (let i of collection) {
    for (let prop in i) {
      if (!i[pre]) return false;
    }
  }
  return true;
};

truthCheck(
  [
    { user: "Tinky-Winky", sex: "male" },
    { user: "Dipsy", sex: "male" },
    { user: "Laa-Laa", sex: "female" },
    { user: "Po", sex: "female" }
  ],
  "sex"
);
