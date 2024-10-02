import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import Hapi from '@hapi/hapi';
import registerRoutes from './routes/registerRoutes';
import { models, generateRoutes } from './routes/treeRoutes';
import { todoSTart } from './services/simonStart.services';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';


const init = async () => {
  todoSTart()


  console.log(process.env.JWT_SECRET, "JWT_SECRET")


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
    host: 'localhost',
    routes: {
      cors: true, // Habilitar CORS
    },
  });


  
  // Registra Inert y Hapi-Swagger
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Mi API',
          version: "0.0.1",
        },
        documentationPage: true,
        documentationPath: '/documentation', // Cambiar la ruta si es necesario
      },
    },
  ]);


  // Define una ruta de ejemplo
  const exampleRoute: Hapi.ServerRoute = {
    method: 'GET',
    path: '/api/example',
    options: {
      tags: ['api'], // Aquí se puede usar 'tags' sin errores
      handler: (request, h) => {
        return { message: 'Hello, World!' };
      },
    },
  };

  server.route(exampleRoute); // Usa la nueva ruta

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
console.log("🚀 ~ init ~  process.env.JWT_SECRET:", process.env.JWT_SECRET)

// Manejar errores no controlados
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
// Llamar a la función de inicialización
init();

