const Events = require('events')

class Server extends Events {
  constructor(client) {
    super();
    this.tasks = {};
    this.taskId = 1;
    process.nextTick(() => this.emit('response', 'Choose an action:'))
    client.on('command', (command, args) => {
      switch (command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
          this[command](args);
          break;
        default:
          this.emit('response', 'This command is not recognized...')
      }
    })
  }

  showAll() {
    return Object.keys(this.tasks).map(id => `${id}: ${this.tasks[id]}`).join("\n")
  }

  help() {
    this.emit('response', `Available commands:
  ls
  add
  delete :id`)
  }
  ls() {
    this.emit('response', this.showAll())
  }
  add(tasks) {
    tasks.forEach(task => { this.tasks[this.taskId] = task; this.taskId++; });
  }
  delete(id) {
    this.emit('response', `Deleted task ${id}: ${this.tasks[id]}`)
    delete this.tasks[id];
  }
}

module.exports = client => new Server(client)