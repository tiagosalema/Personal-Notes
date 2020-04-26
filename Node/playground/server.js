// server.js
const http = require('http');
const pid = process.pid; // pid = process id - just to verify that it's running diff processes

http.createServer((req, res) => {
  for (let i = 0; i < 1e9; i++);
  res.end(`Handled by process ${pid}`)
})
  .listen(80, () => console.log(`Started process ${pid}`));