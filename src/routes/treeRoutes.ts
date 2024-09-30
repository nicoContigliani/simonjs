import Joi from 'joi';
import { rulesValidations } from '../services/joiValidations.services';
import { modelsRead } from '../services/modelsRead.services';
import { businessLogic } from '../services/businessLogic.services';

const usuarioSchema = Joi.object({
    nombre: Joi.string().min(3).max(30).required()
});

export const models = modelsRead(); // Example of models

export const generateRoutes = (model: any | undefined) => {
    const data: any | undefined = rulesValidations;

    const businessLogicModel = businessLogic[model];
    return {
        [model]: {
            path: `/${model}/{id?}`,
            methods: {
                GET: {
                    handler: (request: { params: { id: any; }; }, h: any) => {
                        try {
                            const id = request?.params?.id;
                            if (id) {
                                const asyncFuntion = async () => {
                                    return businessLogic[model]?.GET(id, `${model}`)
                                }
                                return asyncFuntion();
                            } else {
                                const asyncFuntion = async () => {
                                    return businessLogic[model]?.GET(id, `${model}`)
                                }
                                return asyncFuntion();
                            }
                        } catch (error) {
                            console.log("🚀 ~ generateRoutes ~ error:---40", error)
                        }
                    }
                },
                POST: {
                    handler: (request: { payload: any; }, h: { response: (arg0: any) => any; }) => {
                        const newData = request.payload;
                        try {
                            // console.log(`Obteniendo todos los ${model}  ${businessLogic[model].POST(nuevoUsuario)} `)
                            const asyncFuntion = async () => {
                                // return businessLogic[model]?.POST( `${nuevoUsuario}`)
                                // return `Obteniendo todos los ${model}  ${businessLogic[model].POST(nuevoUsuario)} `;
                                return businessLogic[model]?.POST(newData, `${model}`)
                            }
                            return asyncFuntion();

                        } catch (error) {
                            console.log("🚀 ~ generateRoutes ~ error:--51", error)
                        }
                        return h.response(newData).code(201);
                    },
                    options: {
                        validate: {
                            // payload: usuarioSchema,
                            payload: data[`${model}`],
                            failAction: (request: any, h: any, err: any) => {
                                return h.response({ message: err.details[0].message }).code(400).takeover();
                            }
                        }
                    }
                },
                PUT: {
                    handler: (request: { params: { id: any; }; payload: any; }, h: any) => {
                        const id = request.params.id;
                        const datosActualizados = request.payload;
                        console.log("geting put")

                        if (!id) {
                            return h.response({ message: 'ID requerido para actualizar.' }).code(400);
                        }

                        try {
                            const asyncFuntion = async () => {
                                console.log("🚀 ~ generateRoutes ~ asyncFuntion:----83", id,"***************", datosActualizados,"**************" ,model)
                                // return businessLogic[model]?.POST(newData, `${model}`)
                                return businessLogic[model]?.PUT(id, datosActualizados, model)
                                // return `Obteniendo todos los ${model}  ${businessLogic[model].PUT(datosActualizados, id, model)} `;

                            }
                            return asyncFuntion();
                        } catch (error) {
                            console.log("🚀 ~ generateRoutes ~ error:----82", error)

                        }

                        // return h.response(newData).code(201);

                        return h.response({ message: `Actualizando ${model} con id ${id}`, datos: datosActualizados }).code(200);
                    },
                    options: {
                        validate: {
                            // payload: usuarioSchema,
                            payload: data[`${model}`],
                            failAction: (request: any, h: any, err: any) => {
                                return h.response({ message: err.details[0].message }).code(400).takeover();
                            }
                        }
                    }
                },
                DELETE: {
                    handler: (request: { params: { id: any; }; }, h: any) => {
                        const id = request.params.id;

                        if (!id) {
                            return h.response({ message: 'ID requerido para eliminar.' }).code(400);
                        }
                        try {
                            const asyncFuntion = async () => {

                                return `Obteniendo todos los ${model}  ${businessLogic[model].DELETE(id)} `;

                            }
                            return asyncFuntion();

                        } catch (error) {
                            console.log("🚀 ~ generateRoutes ~ error:----115", error)

                        }
                        return h.response({ message: `Eliminando ${model} con id ${id}` }).code(200);
                    }
                }
            }
        }
    }
};