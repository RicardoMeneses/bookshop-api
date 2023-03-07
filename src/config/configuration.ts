import { config as dotEnvConf } from 'dotenv';

dotEnvConf();

export type BookShopConfig = typeof config;

const config = {
  port: process.env.PORT || 4000,
  database: {
    uri: process.env.DB_URI,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
};

export default () => config;
