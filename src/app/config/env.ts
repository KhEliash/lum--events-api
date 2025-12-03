import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
}

export const envVars: EnvConfig = {
  PORT: process.env.PORT as string,
  DB_URL: process.env.DB_URL as string,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
};
