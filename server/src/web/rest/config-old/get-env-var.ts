import { EnvVariableMissingError } from "@contracts/errors/application.error";

export const getEnvVar = (name: string): string => {
  console.log('getEnvVar', process.env.MONGO_URI);
  
  if (!process.env[name]) {
    throw new EnvVariableMissingError(name);
  }
  return process.env[name]!;
};
