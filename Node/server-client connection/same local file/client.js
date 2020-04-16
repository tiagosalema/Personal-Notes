const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout
})

const client = new EventEmitter();
const server = require('./server')(client);

server.on('response', response => {
  console.log(response)
})

let command, args;
rl.on('line', input => {
  [command, ...args] = input.split(" ");
  client.emit('command', command, args)
})