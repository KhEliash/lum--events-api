import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  SSL_STORE_ID: string;
  SSL_STORE_PASS: string;
  SSL_PAYMENT_API: string;
  SSL_VALIDATION_API: string;
  SSL_SUCCESS_BACKEND_URL:string;
  SSL_FAIL_BACKEND_URL:string;
  SSL_CANCEL_BACKEND_URL:string;
  SSL_SUCCESS_FRONTEND_URL:string;
  SSL_FAIL_FRONTEND_URL:string;
  SSL_CANCEL_FRONTEND_URL:string;
}

export const envVars: EnvConfig = {
  PORT: process.env.PORT as string,
  DB_URL: process.env.DB_URL as string,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  SSL_STORE_ID: process.env.SSL_STORE_ID as string,
  SSL_STORE_PASS: process.env.SSL_STORE_PASS as string,
  SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
  SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
  SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
  SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
  SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
  SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
  SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
  SSL_CANCEL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
};
