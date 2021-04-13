const dgram = require('dgram') // datagram module

const PORT = 3333;
const HOST = '127.0.0.1';

// Server
const server = dgram.createSocket('udp4') // udp4 or udp6 depending on the type of socket to use
server.bind(PORT, HOST)

server.on('listening', () => console.log('UDP Server listening')) // triggered when UDP server starts listening
server.on('message', (msg, rinfo) => console.log(`${rinfo.address}:${rinfo.port} - ${msg}`)) // triggered when a socket receives a message
// rinfo - remote info

// Client

const client = dgram.createSocket('udp4')

// send UDP packet with .send
client.send('Pluralsight rocks', PORT, HOST, err => {
  if (err) throw err;
  console.log('UDP message sent')
  client.close();
})

/**
 * Notes: every time a new socket is created, a new port will be used
 */