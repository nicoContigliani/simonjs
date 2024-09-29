import { AppDataSource } from '../ormconfig';

export const businessLogic: any = {
    User: {
        GET: (id: any | undefined, model: any) => {
            let todo
            // console.log(`user live ${id}, ${model}`)
            if (id) return `user live ->${id}, ${model}`

            if (!id) {

                const funtionAsync = async () => {

                    try {
                        console.log("entro a dto")
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

            // console.log(`user live ${id}, ${model}`)
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
    }

}

export const si: any = {
    get: "si"
} 