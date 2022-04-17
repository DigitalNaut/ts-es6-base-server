#!/usr/bin/env node

/// <reference types="node" />

/**
 * Module dependencies.
 */

import 'net';

import debugLib from 'debug';
import app from '../app';

const debug = debugLib('server-test:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const normalPort = parseInt(val, 10);

  if (Number.isNaN(normalPort)) {
    // named pipe
    return val;
  }

  if (normalPort >= 0) {
    // port number
    return normalPort;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Listen on provided port, on all network interfaces.
 * Add event listener for HTTP server "listening" event.
 */

const server = app.listen(port, () => {
  const addr: any = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server listening on ${bind}`);
  debug('DEBUGGING MODE');
});
server.on('error', onError);
