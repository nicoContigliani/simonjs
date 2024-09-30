import { AppDataSource } from '../ormconfig';
import { dao } from './dao.services';

export const businessLogic: any = {
    User: {
        GET: (id: any | undefined, model: any) => {
            let todo
            // console.log(`user live ${id}, ${model}`)
            if (id) return `user live ->${id}, ${model}`

            if (!id) {
                const funtionAsync = async () => {
                    try {
                        const { [model]: Entity } = await import(`../entities/${model}`);
                        const repository = AppDataSource.getRepository(Entity);
                        const users = await repository.find();
                        return users
                    } catch (error) {
                        console.log("🚀 ~ funtionAsync ~ error: -16-", error)
                    }
                }
                funtionAsync();
                return `model:${model} live`
            }
        },
        POST: (data: any[] | any | undefined) => {
            return `user created************${data}`
        },
        PUT: (data: any[] | any | undefined, id: string | number) => {

            return `user updated ${data}-----|----${id}`
        },
        DELETE: (id: string | number) => {
            return `user deleted -----|----${id}`
        }
    },

    Yo: {},
    Product: {
        GET: async (id: any | undefined, model: any) => {
            let todo

            if (id) return `user live ->${id}, ${model}`

            try {
                console.log("entro a dto");
                // Importa dinámicamente la entidad en base al modelo
                const { [model]: Entity } = await import(`../entities/${model}`);

                const repository = AppDataSource.getRepository(Entity);
                const users = await repository.find();  // Aquí se espera a que los usuarios sean obtenidos
                return users;

            } catch (error) {
                console.log("🚀 ~ error: -16-", error);
                return `Error fetching data for model: ${model}`;
            }

        },
        POST: (data: any[] | any | undefined) => {
            return `user created************${data}`
        },
        PUT: (data: any[] | any | undefined, id: string | number) => {

            return `user updated ${data}-----|----${id}`
        },
        DELETE: (id: string | number) => {
            return `user deleted -----|----${id}`
        }
    },
    Evaluation: {
        GET: async (id: any | undefined, model: any) => {

            if (id) {
                try {
                    // Si se proporciona un ID, obtenemos la entidad específica por ID
                    const todo = await dao[model].getid(id);
                    if (todo) {
                        return todo;  // Retorna la entidad encontrada
                    } else {
                        return `No item found with ID ${id} for model ${model}`;
                    }
                } catch (error) {
                    console.error(`Error fetching item by ID: ${id} for model: ${model}`, error);
                    return `Error fetching item by ID ${id} for model ${model}`;
                }
            }

            try {
                const todo = await dao[model].get();
                return todo

            } catch (error) {
                console.log("🚀 ~ error: -16-", error);
                return `Error fetching data for model: ${model}`;
            }

        },
        POST: async (data: any[] | any | undefined, model: any) => {
            try {
                const todo = await dao[model].post(data);
                return todo
            } catch (error) {
                console.log("🚀 ~ error: -16-", error, `Error fetching data for model: ${model}`);
                return `Error fetching data for model: ${model}`;
            }
        },
        PUT: async (id: string | number, data: any[] | any | undefined, model: any) => {

            // try {
            //     console.log("🚀 ~ PUT: ~ id, data:", id, data, "************************************************")

            //     await dao[model].update(id, data);
            //     return await dao[model].findOne(id);

            // } catch (error) {
            //     console.log("🚀 ~ error: -16-", error, `Error fetching data for model: ${model}`);
            //     return `Error fetching data for model: ${model}`;
            // }

            try {
                // Verifica si 'id' y 'data' son válidos
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for update operation");
                }
        
                console.log("🚀 ~ PUT: ~ id, data:", id, data, "************************************************");
        
                // Actualiza el registro usando Sequelize, especificando la condición (where) para buscar el registro por ID
                const updateResult = await dao[model].update(data, {
                    where: { id }
                });
        
                // Verifica si alguna fila fue actualizada
                if (updateResult[0] === 0) {
                    throw new Error(`No records found to update for model: ${model} with id: ${id}`);
                }
        
                // Retorna el registro actualizado
                const updatedRecord = await dao[model].findOne({ where: { id } });
                return updatedRecord;
        
            } catch (error) {
                console.log("🚀 ~ error: -16-", error, `Error updating data for model: ${model}`);
                return `Error updating data for model: ${model}`;
            }

            // return `user updated ${data}-----|----${id}`
        },
        DELETE: (id: string | number) => {
            return `user deleted -----|----${id}`
        }
    }

}

export const si: any = {
    get: "si"
}


// console.log("entro a dao");
// // Importa dinámicamente la entidad en base al modelo
// const { [model]: Entity } = await import(`../entities/${model}`);

// const todo = dao.GETEvaluation(model);
// return todo

// // const repository = AppDataSource.getRepository(Entity);
// // const users = await repository.find({ relations: ['product'] });  // Aquí se espera a que los usuarios sean obtenidos
// // return users;



// GET: (id: any | undefined, model: any) => {
//     let todo
//     // console.log(`user live ${id}, ${model}`)
//     if (id) return `user live ->${id}, ${model}`

//     if (!id) {

//         const funtionAsync = async () => {

//             try {
//                 console.log("entro a dto")
//                 const { [model]: Entity } = await import(`../entities/${model}`);
//                 const repository = AppDataSource.getRepository(Entity);
//                 const users = await repository.find();
//                 return users
//             } catch (error) {
//                 console.log("🚀 ~ funtionAsync ~ error: -16-", error)
//             }
//         }
//         funtionAsync();
//         return `model:${model} live`
//     }
// },
// POST: (data: any[] | any | undefined) => {
//     return `user created************${data}`
// },
// PUT: (data: any[] | any | undefined, id: string | number) => {

//     return `user updated ${data}-----|----${id}`
// },
// DELETE: (id: string | number) => {
//     return `user deleted -----|----${id}`
// }
// },
