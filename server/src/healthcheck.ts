/**
 * Health check to verify if the service is alive.
 */

import * as http from 'node:http';

const options = {};

const request = http.request(options, (response: http.IncomingMessage) => {
  process.exitCode = response.statusCode === 200 ? 0 : 1;
  process.exit();
});

request.on('error', () => {
  process.exit(1);
});

request.end();
