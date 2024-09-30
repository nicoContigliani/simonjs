import { Evaluation } from "../entities/Evaluation";
import { AppDataSource } from "../ormconfig";

const entities = async (model: string) => {
    const { [model]: Entity } = await import(`../entities/${model}`);
    return Entity; // Retorna la entidad
};

export const dao: any = {
    // DAO para el modelo Evaluation
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
                where: { id },  // Busca por el campo 'id'
                relations: ['product'] // Incluye la relación con 'product'
            });
            return item;
        },
        post: async (data: any) => {
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);
            return await repository.save(data);
        },
        put: async (data: any, id: any) => {
            console.log("🚀 ~ put: ~ data:", data)
            const Entity = await entities('Evaluation');
            const repository = AppDataSource.getRepository(Entity);

            await repository.update(id, data);
            return repository.findOne(id);
        },
        // Aquí puedes agregar otros métodos, como findOne, create, update, etc.
    },
} 