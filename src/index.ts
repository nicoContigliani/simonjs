import 'reflect-metadata';
import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt'; // Importación de @hapi/jwt
import { AppDataSource } from './ormconfig';
import registerRoutes from './routes/registerRoutes';
import { models, generateRoutes } from './routes/treeRoutes';
import { todoSTart } from './services/simonStart.services';
import authService from './services/auth.services';
import { registerJwtStrategy } from './utils/jwtStrategy';
import { swaggerConfiguration } from './utils/swaggerConfigurationUtils';



const init = async () => {
    todoSTart(); // This function's purpose is not clear from the provided code.

    // Initialize the database connection
    try {
        await AppDataSource.initialize();
        console.log('Database connected');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
        process.exit(1); // Exit process if there's an error
    }

    // Create a Hapi.js server instance
    const server = Hapi.server({
        port: 3000, // You can change the port if needed
        host: 'localhost',
        routes: {
            cors: true, // Enable Cross-Origin Resource Sharing
        },
    });
    
    // Register plugins for serving static content, templating, and generating API documentation
    await swaggerConfiguration(server)
    
    // Registrar el plugin @hapi/jwt
    await server.register(Jwt);

    // Registrar la estrategia JWT
    registerJwtStrategy(server);

    // Registrar la  auth service - sepate logic auth and other services
    authService(server);



    // Define a sample route for testing
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, Hapi!';
        }
    });

    // Generate routes dynamically based on models
    const treeRoutes = models.reduce((acc, model) => {
        return { ...acc, ...generateRoutes(model) };
    }, {});

    // Register the dynamically generated routes
    registerRoutes(server, treeRoutes);

    // Start the server
    await server.start();
    console.log('Server running on %s', server.info.uri);
    if (process.env.ENVIRIOMENTS === "developer") console.log('Documentation API', `${server.info.uri}/documentation`);

};

// Handle uncaught promise rejections
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// Start the application
init();