// connect clients with netcat (mac) or telnet (windows)

process.stdout.write("\u001B[2J\u001B[0;0f");

const server = require('net').createServer();
let sockets = {}; // so that we can have multiple clients at the same time
let counter = 0; // client id

server.on('connection', socket => {
  console.log('Client connect');
  socket.write('Welcome new client!\n')

  socket.id = counter++;
  sockets[socket.id] = socket;

  socket.on('data', data => {
    Object.entries(sockets).forEach(([key, cs]) => {
      if (key != socket.id) {
        cs.write(`${socket.id}: ${data}`)
      }
    })
  })

  socket.on('close', () => delete sockets[socket.id])

})

server.listen(8000, () => console.log('Server bound'))
