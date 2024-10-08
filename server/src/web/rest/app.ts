import 'reflect-metadata';
import 'source-map-support/register';

import { PlatformExpress } from '@tsed/platform-express';
import * as emoji from 'node-emoji';

import { Logger } from '@domain/shared';
import { bootstrap } from '@infrastructure/shared';
import { Server } from './server';
import { connectToMongoDB } from '@infrastructure/shared/persistence/connection-mongo';

const start = async (): Promise<void> => {
  await bootstrap();
  await connectToMongoDB();
  
  const platform = await PlatformExpress.bootstrap(Server, { ...(await Server.getConfiguration()) });
  await platform.listen();
  
  process
  .on('SIGINT', () => {
    platform.stop();
    Logger.info(`${emoji.get('zap')} Server gracefully shut down!`);
  })
  .on('unhandledRejection', error => {
    Logger.error(`${emoji.get('skull')} uncaughtException captured: ${error}`);
  })
  .on('uncaughtException', error => {
    Logger.error(`${emoji.get('skull')} uncaughtException captured: ${error}`);
  });
  console.log('batta');
};
start().then(() => {
  Logger.info('Server started');
  
}).catch((error) => {
  Logger.error('Error starting server', error);
})
