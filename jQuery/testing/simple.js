const Liquid = require("liquidjs");
const path = require("path");

const engine = new Liquid({
  root: path.resolve(__dirname, "views/"),
  extname: ".liquid"
});

engine.renderFile("hello", { name: "Tiago" }).then(console.log);
