import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import Hapi from '@hapi/hapi';
import registerRoutes from './routes/registerRoutes';
import { models, generateRoutes } from './routes/treeRoutes';
import { todoSTart } from './services/simonStart.services';
const init = async () => {
  todoSTart()

  // Inicializar la base de datos
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error: any) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1); // Salir si hay un error
  }

  // Crear servidor Hapi
  const server = Hapi.server({
    port: 3000, // Puedes cambiar el puerto si es necesario
    host: 'localhost'
  });


  // Definir una ruta de prueba
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, Hapi!';
    }
  });

  // Generate routes based on models
  const treeRoutes = models.reduce((acc: any, model: any) => {
    return { ...acc, ...generateRoutes(model) };
  }, {});

  registerRoutes(server, treeRoutes);



  // Iniciar el servidor
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

// Manejar errores no controlados
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
// Llamar a la función de inicialización
init();

