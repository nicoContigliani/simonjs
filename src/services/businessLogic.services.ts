import { AppDataSource } from '../ormconfig';
import { dao } from './dao.services';
import { messageError } from './messageError.services';

export const businessLogic: any = {
    User: {
        GET: async (id: any | undefined, model: any) => {

            if (id) {
                try {
                    // If an ID is provided, we get the specific entity by ID
                    const item = await dao[model].getid(id);
                    if (item) {
                        return item;  // Return the found entity
                    } else {
                        return `No item found with ID ${id} for model ${model}`;
                    }
                } catch (error) {
                    console.error(`Error fetching item by ID: ${id} for model: ${model}`, error);
                    return `Error fetching item by ID ${id} for model ${model}`;
                }
            }

            try {
                const items = await dao[model].get();
                return items;

            } catch (error) {
                if (process.env.ENVIRIOMENTS === "developer") messageError("\n You need to add the dto model in src/services/dao.services.ts file");
                return `Error fetching data for model: ${model}`;
            }

        },
        POST: async (data: any[] | any | undefined, model: any) => {
            try {
                const item = await dao[model].post(data);
                return item;
            } catch (error) {
                if (process.env.ENVIRIOMENTS === "developer") messageError(`\n Post: You need to add the dto model in src/services/dao.services.ts file --- ${model}`);
                return `Error posting data for model: ${model}`;
            }
        },
        PUT: async (id: string | number, data: any[] | any | undefined, model: any) => {

            try {
                // Check if 'id' and 'data' are valid
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for update operation");
                }

                const updatedRecord = await dao[model].put(data, id);
                return updatedRecord;

            } catch (error: any) {
                if (process.env.ENVIRIOMENTS === "developer") messageError(`\n Put: You need to add the dto model in src/services/dao.services.ts file --- ${model}`);
                return `Error updating data for model: ${model}`;
            }
        },
        DELETE: async (id: string | number, model: any) => {

            // Create the object with the dynamic key and the assigned value
            const data = { [`status_${model}`]: false };
            try {
                // Check if 'id' and 'data' are valid
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for delete operation");
                }
                const updatedRecord = await dao[model].put(data, id);
                return updatedRecord;

            } catch (error: any) {
                if (process.env.ENVIRIOMENTS === "developer") messageError(`\n Delete: You need to add the dto model in src/services/dao.services.ts file --- ${model}`);
                return `Error deleting data for model: ${model}`;
            }
        }
    },

    Yo: {},
    Product: {
        GET: async (id: any | undefined, model: any) => {
            let item;

            if (id) return `Product fetched with ID ->${id}, Model -> ${model}`;

            try {
                console.log("Entered the dto");

                // Dynamically import the entity based on the model
                const { [model]: Entity } = await import(`../entities/${model}`);

                const repository = AppDataSource.getRepository(Entity);
                const products = await repository.find();  // Fetch the products
                return products;

            } catch (error) {
                console.log("🚀 ~ error: -16-", error);
                return `Error fetching data for model: ${model}`;
            }

        },
        POST: (data: any[] | any | undefined) => {
            return `Product created ************ ${data}`;
        },
        PUT: (data: any[] | any | undefined, id: string | number) => {

            return `Product updated: ${data} -----|---- ${id}`;
        },
        DELETE: (id: string | number) => {
            return `Product deleted -----|---- ${id}`;
        }
    },
    Def: {
        GET: async (id: any | undefined, model: any, modelDynamic: any) => {
            console.log("***********Default**************");

            if (id) {
                try {
                    const item = await dao[model].getid(id);
                    if (item) {
                        return item;
                    } else {
                        return `No item found with ID ${id} for model ${model}`;
                    }
                } catch (error) {
                    console.error(`Error fetching item by ID: ${id} for model: ${model}`, error);
                    return `Error fetching item by ID ${id} for model ${model}`;
                }
            }

            try {
                console.log("***********Default**************");

                const items = await dao[model].get();
                return items;

            } catch (error) {
                console.log("🚀 ~ error: -16-", error);
                return `Error fetching data for model: ${model}`;
            }

        },
        POST: async (data: any[] | any | undefined, model: any) => {
            try {
                const item = await dao[model].post(data);
                return item;
            } catch (error) {
                console.log("🚀 ~ error: -16-", error, `Error posting data for model: ${model}`);
                return `Error posting data for model: ${model}`;
            }
        },
        PUT: async (id: string | number, data: any[] | any | undefined, model: any) => {

            try {
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for update operation");
                }

                const updatedRecord = await dao[model].put(data, id);
                return updatedRecord;

            } catch (error: any) {
                console.log("🚀 ~ error: -131-", error.messages, `Error updating data for model: ${model}`);
                return `Error updating data for model: ${model}`;
            }

        },
        DELETE: async (id: string | number, model: any) => {

            const data = { [`status_${model}`]: false };
            try {
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for delete operation");
                }
                const updatedRecord = await dao[model].put(data, id);
                return updatedRecord;

            } catch (error: any) {
                console.log("🚀 ~ error: -131-", error.messages, `Error deleting data for model: ${model}`);
                return `Error deleting data for model: ${model}`;
            }
        }
    },
    Evaluation: {
        GET: async (id: any | undefined, model: any, modelDynamic: any) => {

            if (id) {
                try {
                    const item = await dao[model].getid(id);
                    if (item) {
                        return item;
                    } else {
                        return `No item found with ID ${id} for model ${model}`;
                    }
                } catch (error) {
                    console.error(`Error fetching item by ID: ${id} for model: ${model}`, error);
                    return `Error fetching item by ID ${id} for model ${model}`;
                }
            }

            try {
                const items = await dao[model].get();
                return items;

            } catch (error) {
                console.log("🚀 ~ error: -16-", error);
                return `Error fetching data for model: ${model}`;
            }

        },
        POST: async (data: any[] | any | undefined, model: any) => {
            try {
                const item = await dao[model].post(data);
                return item;
            } catch (error) {
                console.log("🚀 ~ error: -16-", error, `Error posting data for model: ${model}`);
                return `Error posting data for model: ${model}`;
            }
        },
        PUT: async (id: string | number, data: any[] | any | undefined, model: any) => {

            try {
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for update operation");
                }

                const updatedRecord = await dao[model].put(data, id);
                return updatedRecord;

            } catch (error: any) {
                console.log("🚀 ~ error: -131-", error.messages, `Error updating data for model: ${model}`);
                return `Error updating data for model: ${model}`;
            }

        },
        DELETE: async (id: string | number, model: any) => {

            const data = { [`status_${model}`]: false };
            try {
                if (!id || !data) {
                    throw new Error("Missing 'id' or 'data' for delete operation");
                }
                const updatedRecord = await dao[model].put(data, id);
                return updatedRecord;

            } catch (error: any) {
                console.log("🚀 ~ error: -131-", error.messages, `Error deleting data for model: ${model}`);
                return `Error deleting data for model: ${model}`;
            }
        }
    },
};