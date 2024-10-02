import { rulesValidations } from '../services/joiValidations.services';
import { modelsRead } from '../services/modelsRead.services';
import { businessLogic } from '../services/businessLogic.services';
import { messageError } from '../services/messageError.services';
import { dao, daoDinamic } from '../services/dao.services';
import { options } from 'joi';





const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list: any) => {
    console.log(list.getEntries()[0].duration);
});
obs.observe({ entryTypes: ['measure'] });

const warningMessage = (model?: string | undefined, message?: string) => {
    console.log("****************************************************************************************************************************************************")
    console.log("**************", model, "Warning You are using dinamic model but you neet create dto model in src/services/dao.services.ts file --******************")
    console.log("****************************************************************************************************************************************************")

}



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

                    handler: async (request: { params: { id: string | number; }; }, h: any) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const id = request?.params?.id;

                        if ((!businessLogicModel?.GET(id, model)
                            && !businessLogicModel?.GET(null, model))
                            && process.env.ENVIRIOMENTS === "developer") {
                            warningMessage(model)
                        }

                        // GET para una entidad específica o todas
                        const operation = (!businessLogicModel?.GET(id, model) && !businessLogicModel?.GET(null, model)) ?
                            id
                                ? () => daoDinamic?.getId(model, id)
                                : () => daoDinamic?.get(model)
                            :
                            id
                                ? () => businessLogicModel?.GET(id, model)
                                : () => businessLogicModel?.GET(null, model);

                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('end');
                        if (process.env.ENVIRIOMENTS === "developer") performance.measure('API Call Duration', 'start', 'end');

                        return handleRequest(operation, h);
                    },
                    options: {
                        tags: ['api', 'getModel'], // Esto se mostrará en Swagger
                        description: 'Obtiene un modelo específico o todos'
                    }
                },
                POST: {
                    handler: async (request: { payload: any; }, h: { response: (arg0: any) => any; }) => {


                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');
                        const newData = request.payload;

                        if (!businessLogicModel?.POST(newData, model) && (process.env.ENVIRIOMENTS === "developer")) {
                            warningMessage(model)

                            if (!newData) throw new Error('It didnt receive any data');
                        }

                        const operation = () => (!businessLogicModel?.POST(newData, model)) ?
                            daoDinamic?.post(newData, model) :
                            businessLogicModel?.POST(newData, model);

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
                        },
                        tags: ['api', 'postModel'], // Esto se mostrará en Swagger
                        description: 'Obtiene un modelo específico o todos',
                    }
                },
                PUT: {
                    handler: async (request: { params: { id: string | number; }; payload: any; }, h: any) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const id = request.params.id;
                        const updatedData = request?.payload;

                        if (!businessLogicModel?.PUT(updatedData, model) && (process.env.ENVIRIOMENTS === "developer")) {
                            warningMessage(model)
                            if (!updatedData) throw new Error('It didnt receive any data');
                        }

                        if (!id) {
                            return h.response({ message: 'ID requerido para actualizar.' }).code(400);
                        }

                        const operation = !businessLogicModel?.PUT(id, updatedData, model) ?
                            async () => await daoDinamic?.update(updatedData, id, model) :
                            async () => await businessLogicModel?.PUT(id, updatedData, model);

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
                        },
                        tags: ['api', 'putModel'], // Esto se mostrará en Swagger
                        description: 'Obtiene un modelo específico o todos',

                    }
                },
                DELETE: {

                    handler: async (request: { params: { id: string | number; }; payload: any; }, h: any) => {
                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('start');

                        const id = request.params.id;
                        const data = { [`status_${model}`]: false };


                        if (!businessLogicModel?.DELETE(id, model) && (process.env.ENVIRIOMENTS === "developer")) {
                            warningMessage(model)
                            if (!id) {
                                return h.response({ message: 'ID requerido for delete.' }).code(400);
                            }
                        }


                        const operation = !businessLogicModel?.DELETE(id, model) ?
                            async () => await await daoDinamic?.delete(data, id) :
                            async () => await businessLogicModel?.DELETE(id, model);

                        if (process.env.ENVIRIOMENTS === "developer") performance.mark('end');
                        if (process.env.ENVIRIOMENTS === "developer") performance.measure('API Call Duration', 'start', 'end');

                        return handleRequest(operation, h);
                    },
                    options: {
                        tags: ['api', 'deleteModel'], // Esto se mostrará en Swagger
                        description: 'Obtiene un modelo específico o todos'
                    }
                }
            }
        }
    }
};
