// Ensures node is in PATH before Next.js spawns child processes
const { spawn } = require('child_process');
const path = require('path');

process.env.PATH = '/opt/homebrew/bin:' + (process.env.PATH || '');

const mode = process.argv[2] || 'dev';
const next = path.resolve(__dirname, '..', 'node_modules', '.bin', 'next');
const child = spawn(next, [mode, '--port', '3000'], {
  stdio: 'inherit',
  env: process.env,
  cwd: path.resolve(__dirname, '..'),
});

child.on('exit', (code) => process.exit(code ?? 0));
