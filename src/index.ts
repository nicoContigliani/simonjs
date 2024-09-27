import 'reflect-metadata';
import { AppDataSource } from './ormconfig';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error:any) => console.log(error));