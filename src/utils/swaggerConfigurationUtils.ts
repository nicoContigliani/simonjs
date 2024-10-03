import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { Server } from '@hapi/hapi';

// Servicio para registrar los plugins
export const swaggerConfiguration = async (server: Server) => {
    try {
        await server.register([
            Inert, 
            Vision, 
            {
                plugin: HapiSwagger,
                options: {
                    info: {
                        title: 'SIMONJS API',
                        version: "0.0.1",
                    },
                    documentationPage: true,
                    documentationPath: '/documentation',
                    payloadType: 'json', 

                },
            },
        ]);

        console.log('Plugins registrados correctamente');
    } catch (err) {
        console.error('Error registrando plugins:', err);
        throw err; // Esto permitirá que el error se propague si hay un fallo
    }
};