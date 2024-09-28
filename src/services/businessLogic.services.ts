import Joi from 'joi';


export const businessLogic: any = {
    User: {
        GET: (id: any | undefined) => {
            if (id) return `user live ${id}`
            return "user live"
        },
        POST: (data: any[] | any | undefined) => {
            return `user created************${data}`
        },
        PUT: (data: any[] | any | undefined, id:string|number) => {
            
            return `user updated ${data}-----|----${id}`
        },
        DELETE: (id:string|number) => {
            return `user deleted -----|----${id}`
        }
    },

    Yo: {}

}

export const si: any = {
    get: "si"
} 