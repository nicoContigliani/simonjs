import Joi from 'joi';

const usuarioSchema = Joi.object({
    nombre: Joi.string().min(3).max(30).required()
});

export const models = ['usuarios']; // Example of models

export const generateRoutes = (model: string) => {
    return {
        [model]: {
            path: `/${model}/{id?}`,
            methods: {
                GET: {
                    handler: (request: { params: { id: any; }; }, h: any) => {
                        const id = request.params.id;
                        if (id) {
                            return `Obteniendo ${model} con id ${id}`;
                        } else {
                            return `Obteniendo todos los ${model}`;
                        }
                    }
                },
                POST: {
                    handler: (request: { payload: any; }, h: { response: (arg0: any) => any; }) => {
                        const nuevoUsuario = request.payload;
                        return h.response(nuevoUsuario).code(201);
                    },
                    options: {
                        validate: {
                            payload: usuarioSchema,
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

                        if (!id) {
                            return h.response({ message: 'ID requerido para actualizar.' }).code(400);
                        }

                        return h.response({ message: `Actualizando ${model} con id ${id}`, datos: datosActualizados }).code(200);
                    },
                    options: {
                        validate: {
                            payload: usuarioSchema,
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

                        return h.response({ message: `Eliminando ${model} con id ${id}` }).code(200);
                    }
                }
            }
        }
    }
};