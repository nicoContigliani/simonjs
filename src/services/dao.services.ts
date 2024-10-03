import { Evaluation } from "../entities/Evaluation";
import { AppDataSource } from "../ormconfig";

const entities = async (model: string) => {
    const { [model]: Entity } = await import(`../entities/${model}`);
    return Entity; // Returns the entity
};

export const dao: any = {
    // DAO for the Evaluation model
    User: {
        get: async () => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            const items = await repository.find();
            return items;
        },
        getid: async (id: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            const item = await repository.findOne({
                where: { id },  // Searches by the 'id' field
            });
            return item;
        },
        post: async (data: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            return await repository.save(data);
        },
        put: async (data: any, id: any) => {
            console.log("🚀 ~ put: ~ data:", data);
            const Entity = await entities('Evaluation');
            const repository = await AppDataSource.getRepository(Entity);
            try {
                const updateResult = await repository.update(id, data);
                console.log("🚀 ~ put: ~ updateResult:---39", updateResult);
                return updateResult;
            } catch (error) {
                console.log("🚀 ~ put: ~ error:", error);
            }
        },
        delete: async (data: any, id: any) => {
            const Entity = await entities('Evaluation');
            const repository = await AppDataSource.getRepository(Entity);
            try {
                const updateResult = await repository.update(id, data);
                return updateResult;
            } catch (error) {
                console.log("🚀 ~ put: ~ error:", error);
            }
        },
    },
    Evaluation: {
        get: async () => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            const items = await repository.find({ relations: ['product'] });
            return items;
        },
        getid: async (id: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            const item = await repository.findOne({
                where: { id },  // Searches by the 'id' field
                relations: ['product'], // Includes relation with 'product'
            });
            return item;
        },
        post: async (data: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            return await repository.save(data);
        },
        put: async (data: any, id: any) => {
            console.log("🚀 ~ put: ~ data:", data);
            const Entity = await entities('Evaluation');
            const repository = await AppDataSource.getRepository(Entity);
            try {
                const updateResult = await repository.update(id, data);
                console.log("🚀 ~ put: ~ updateResult:---39", updateResult);
                return updateResult;
            } catch (error) {
                console.log("🚀 ~ put: ~ error:", error);
            }
        },
        delete: async (data: any, id: any) => {
            const Entity = await entities('Evaluation');
            const repository = await AppDataSource.getRepository(Entity);
            try {
                const updateResult = await repository.update(id, data);
                return updateResult;
            } catch (error) {
                console.log("🚀 ~ put: ~ error:", error);
            }
        },
    },
    default: {
        get: async () => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            const items = await repository.find({ relations: ['product'] });
            return items;
        },
        getid: async (id: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            const item = await repository.findOne({
                where: { id },  // Searches by the 'id' field
                relations: ['product'], // Includes relation with 'product'
            });
            return item;
        },
        post: async (data: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            return await repository.save(data);
        },
        put: async (data: any, id: any) => {
            console.log("🚀 ~ put: ~ data:", data);
            const Entity = await entities('Evaluation');
            const repository = await AppDataSource.getRepository(Entity);
            try {
                const updateResult = await repository.update(id, data);
                console.log("🚀 ~ put: ~ updateResult:---39", updateResult);
                return updateResult;
            } catch (error) {
                console.log("🚀 ~ put: ~ error:", error);
            }
        },
        delete: async (data: any, id: any) => {
            const Entity = await entities('Evaluation');
            const repository = await AppDataSource.getRepository(Entity);
            try {
                const updateResult = await repository.update(id, data);
                return updateResult;
            } catch (error) {
                console.log("🚀 ~ put: ~ error:", error);
            }
        },
    },
};

export const daoDinamic: any | undefined = {
    get: async (model: string): Promise<any[]> => {
        try {
            if (!model) throw new Error("Model not provided.");

            const Entity = await entities(model);
            if (!Entity) throw new Error("Entity not found.");

            const repository = AppDataSource.getRepository(Entity);
            return await repository.find();
        } catch (error: any) {
            console.error("Error in daoDinamic.get:", error);
            throw new Error(`Error fetching data for model "${model}": ${error.message}`);
        }
    },

    getId: async (model: string, id: number | string): Promise<any | null> => {
        try {
            if (!model) throw new Error("Model not provided.");
            if (!id) throw new Error("ID not provided.");

            const Entity = await entities(model);
            if (!Entity) throw new Error("Entity not found.");

            const repository = AppDataSource.getRepository(Entity);
            const item = await repository.findOne({
                where: { id }, // Searches by the 'id' field
            });

            if (!item) throw new Error(`Item with ID ${id} not found.`);

            return item;
        } catch (error: any) {
            console.error("Error in daoDinamic.getId:", error);
            throw new Error(`Error fetching item with ID ${id} from model "${model}": ${error.message}`);
        }
    },
    post: async (data: any | undefined, model: string): Promise<any | null> => {
        try {
            if (!model) throw new Error("Model not provided.");

            const Entity = await entities(model);
            if (!Entity) throw new Error("Entity not found.");
            const repository = AppDataSource.getRepository(Entity);
            return await repository.save(data);
        } catch (error: any) {
            console.error("Error in daoDinamic.post:", error);
            throw new Error(`Error posting data for model "${model}": ${error.message}`);
        }
    },
    update: async (data: any[] | any, id: number | string, model: string): Promise<any | null> => {
        try {
            if (!model) throw new Error("Model not provided.");

            const Entity = await entities(model);
            if (!Entity) throw new Error("Entity not found.");

            const repository = AppDataSource.getRepository(Entity);
            const updateResult = await repository.update(id, data);
            const item = await repository.findOne({
                where: { id }, // Searches by the 'id' field
            });
            return item;
        } catch (error: any) {
            console.error("Error in daoDinamic.update:", error);
        }
    },
    delete: async (id: number | string, model: string): Promise<any | null> => {
        try {
            if (!model) throw new Error("Model not provided.");

            const Entity = await entities(model);
            if (!Entity) throw new Error("Entity not found.");

            const data = { [`status_${model}`]: false };
            const idData = { ["id"]: 0 };

            const repository = AppDataSource.getRepository(Entity);
            const updateResult = await repository.update(id, idData);
            return updateResult;
        } catch (error: any) {
            console.error("Error in daoDinamic.delete:", error);
        }
    }
};
