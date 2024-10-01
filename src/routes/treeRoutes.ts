import { rulesValidations } from '../services/joiValidations.services';
import { modelsRead } from '../services/modelsRead.services';
import { businessLogic } from '../services/businessLogic.services';
import { messageError } from '../services/messageError.services';

const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list: any) => {
    console.log(list.getEntries()[0].duration);
});
obs.observe({ entryTypes: ['measure'] });


// Cargar modelos
export const models = modelsRead();

// Función para generar rutas
export const generateRoutes = (model: string | undefined) => {
    // Validación del modelo antes de proceder
    if (!model) {
        throw new Error("Modelo no proporcionado.");
    }

    // Reglas de validación y lógica de negocio para el modelo
    const validationSchema: any | any[] | undefined = rulesValidations[model];
    const businessLogicModel = businessLogic[model];

    // Función común para manejar peticiones asíncronas
    const handleRequest = async (operation: () => Promise<any>, h: any) => {
        try {
            return await operation();
        } catch (error) {
            if (process.env.ENVIRIOMENTS === "developer") {
                messageError(error);
            }
            return h.response({ message: "Error interno del servidor" }).code(500);
        }
    };

    return {
        [model]: {
            path: `/${model}/{id?}`,
            methods: {
                GET: {
                    handler: async (request: { params: { id: any; }; }, h: any) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const id = request?.params?.id;

                        // GET para una entidad específica o todas
                        const operation = id
                            ? () => businessLogicModel?.GET(id, model)
                            : () => businessLogicModel?.GET(null, model);

                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('end');
                        if (process.env.ENVIRIOMENTS === "developer") performance.measure('API Call Duration', 'start', 'end');

                        return handleRequest(operation, h);
                    }
                },
                POST: {
                    handler: async (request: { payload: any; }, h: { response: (arg0: any) => any; }) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const newData = request.payload;
                        const operation = () => businessLogicModel?.POST(newData, model);
                        const result = await handleRequest(operation, h);

                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('end');
                        if (process.env.ENVIRIOMENTS === "developer") performance.measure('API Call Duration', 'start', 'end');

                        return h.response(result).code(201);
                    },
                    options: {
                        validate: {
                            payload: validationSchema, // Validación con Joi
                            failAction: (request: any, h: any, err: any) => {
                                return h.response({ message: err.details[0].message }).code(400).takeover();
                            }
                        }
                    }
                },
                PUT: {
                    handler: async (request: { params: { id: any; }; payload: any; }, h: any) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const id = request.params.id;
                        const updatedData = request.payload;

                        if (!id) {
                            return h.response({ message: 'ID requerido para actualizar.' }).code(400);
                        }

                        const operation = async () => {
                            await businessLogicModel?.PUT(id, updatedData, model);
                            return businessLogicModel?.GET(id, model);
                        };
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('end');
                        if (process.env.ENVIRIOMENTS === "developer") performance.measure('API Call Duration', 'start', 'end');

                        return handleRequest(operation, h);
                    },
                    options: {
                        validate: {
                            payload: validationSchema, // Validación con Joi
                            failAction: (request: any, h: any, err: any) => {
                                return h.response({ message: err.details[0].message }).code(400).takeover();
                            }
                        }
                    }
                },
                DELETE: {
                    handler: async (request: { params: { id: any; }; }, h: any) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const id = request.params.id;

                        if (!id) {
                            return h.response({ message: 'ID requerido para eliminar.' }).code(400);
                        }

                        const operation = () => businessLogicModel?.DELETE(id, model);

                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('end');
                        if (process.env.ENVIRIOMENTS === "developer") performance.measure('API Call Duration', 'start', 'end');

                        return handleRequest(operation, h);
                    }
                }
            }
        }
    }
};
