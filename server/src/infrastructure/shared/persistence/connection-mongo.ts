import { Logger } from '@domain/shared';
import { getEnvVar } from '@web/rest/config-old/get-env-var';
import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  const uri = getEnvVar('MONGO_URI');
  
  try {
    const connection = await mongoose.connect(uri, {});
    Logger.info(`Connected to MongoDB at ${connection.connection.host}`);
  } catch (error) {
    Logger.error(`Failed to connect to MongoDB: ${error}`);

    throw new Error('Failed to connect to MongoDB');
    process.exit
  }
};

export { connectToMongoDB };