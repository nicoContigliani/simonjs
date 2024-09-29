// import { DataSource } from 'typeorm';
// import { User } from './entities/User';
// import * as dotenv from 'dotenv';
// import { Product } from './entities/Product';

// dotenv.config();

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [User],
//   migrations: ['src/migrations/*.ts'],
//   synchronize: false, // Se usa `false` en producción para evitar sincronización automática.
//   logging: true,
// });

import { DataSource } from 'typeorm';
import { User } from './entities/User';
import * as dotenv from 'dotenv';
import { Product } from './entities/Product';
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '/entities/*.ts')],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Se usa `false` en producción para evitar sincronización automática.
  logging: true,
});