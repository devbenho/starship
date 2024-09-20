
type NODE_ENV = "development" | "production" | "stage" | "test";

type DB_TYPE = "postgres" | "mysql" | "mariadb" | "sqlite" | "mssql";

export interface IConfig extends Partial<NodeJS.ProcessEnv> {
  PORT: string;
  NODE_ENV: NODE_ENV;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  DB_TYPE: DB_TYPE;
  HASH_SALT: string;
}
