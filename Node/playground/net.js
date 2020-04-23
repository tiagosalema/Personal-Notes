const { spawn } = require('child_process');

const child = spawn('ls', {
  stdio: 'inherit'
});