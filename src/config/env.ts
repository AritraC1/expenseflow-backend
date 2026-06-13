// Centralised config env file

const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_DATABASE: process.env.MONGO_INITDB_DATABASE,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
} as const;

// validator helper
function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

// export guaranteed-safe values
export const PORT = Number(env.PORT ?? 3000);

export const MONGO_URI = required(env.MONGO_URI, "MONGO_URI");

export const MONGO_INITDB_ROOT_USERNAME = required(
  env.MONGO_INITDB_ROOT_USERNAME,
  "MONGO_INITDB_ROOT_USERNAME",
);

export const MONGO_INITDB_ROOT_PASSWORD = required(
  env.MONGO_INITDB_ROOT_PASSWORD,
  "MONGO_INITDB_ROOT_PASSWORD",
);

export const MONGO_INITDB_DATABASE = required(
  env.MONGO_INITDB_DATABASE,
  "MONGO_INITDB_DATABASE",
);

export const JWT_SECRET_KEY = required(env.JWT_SECRET_KEY, "JWT_SECRET_KEY");
