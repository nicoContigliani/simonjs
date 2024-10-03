import { rulesValidations } from '../services/joiValidations.services';
import { modelsRead } from '../services/modelsRead.services';
import { businessLogic } from '../services/businessLogic.services';
import { messageError } from '../services/messageError.services';
import { dao, daoDinamic } from '../services/dao.services';
import { options } from 'joi';
import Joi from 'joi';





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
        throw new Error("Invalid model.");
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
            return h.response({ message: "Internal server error" }).code(500);
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
                        description: 'Obtiene un modelo específico o todos',
                        response: {
                            status: {
                                //         200: Joi.object({
                                //             success: Joi.boolean().description('Estado de la respuesta'),
                                //             data: Joi.any().description('Datos del modelo o lista de modelos')
                                //         }),
                                //         400: Joi.object({
                                //             error: Joi.string().description('Error de validación')
                                //         })
                            }
                        },
                        plugins: {
                            'hapi-swagger': {
                                responses: {
                                    200: { description: 'OK - Modelo o lista de modelos obtenidos exitosamente' },
                                    400: { description: 'Solicitud incorrecta - Parámetros inválidos' }
                                }
                            }
                        }
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
                        // response: {
                        //     status: {
                        //         201: Joi.object({
                        //             success: Joi.boolean().description('Indica si la creación fue exitosa'),
                        //             data: Joi.any().description('Datos del modelo creado')
                        //         }),
                        //         400: Joi.object({
                        //             error: Joi.string().description('Mensaje de error si hubo problemas con la creación')
                        //         })
                        //     }
                        // },
                        // plugins: {
                        //     'hapi-swagger': {
                        //         responses: {
                        //             201: { description: 'Created - El modelo fue creado exitosamente' },
                        //             400: { description: 'Bad Request - Error en los datos proporcionados' }
                        //         }
                        //     }
                        // }
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
                        // response: {
                        //     status: {
                        //         200: Joi.object({
                        //             success: Joi.boolean().description('Estado de la respuesta'),
                        //             data: Joi.any().description('Datos del modelo actualizado')
                        //         }),
                        //         404: Joi.object({
                        //             error: Joi.string().description('Mensaje de error si el modelo no se encontró')
                        //         }),
                        //         400: Joi.object({
                        //             error: Joi.string().description('Error de validación')
                        //         })
                        //     }
                        // },
                        // plugins: {
                        //     'hapi-swagger': {
                        //         responses: {
                        //             200: { description: 'OK - El modelo fue actualizado exitosamente' },
                        //             400: { description: 'Bad Request - Error en los datos proporcionados' },
                        //             404: { description: 'Not Found - El modelo no fue encontrado' }
                        //         }
                        //     }
                        // }
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
                        description: 'Obtiene un modelo específico o todos',
                        // response: {
                        //     status: {
                        //         200: Joi.object({
                        //             success: Joi.boolean().description('Indica si la eliminación fue exitosa'),
                        //             message: Joi.string().description('Mensaje de éxito en la eliminación')
                        //         }),
                        //         404: Joi.object({
                        //             error: Joi.string().description('Mensaje de error si el modelo no fue encontrado')
                        //         })
                        //     }
                        // },
                        // plugins: {
                        //     'hapi-swagger': {
                        //         responses: {
                        //             200: { description: 'OK - El modelo fue eliminado exitosamente' },
                        //             404: { description: 'Not Found - El modelo no fue encontrado' }
                        //         }
                        //     }
                        // }
                    }
                }
            }
        }
    }
};
