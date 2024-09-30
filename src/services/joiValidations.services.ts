import Joi from 'joi';


export const rulesValidations: object = {
    User: Joi.object({
        id: Joi.number()
            .min(1)
            .optional() // El id es opcional
            .messages({
                'number.base': 'ID must be a number',
                'number.min': 'ID must be greater than or equal to 1'
            }),
        email: Joi.string()
            .email() // Valida que sea un correo electrónico
            .required() // Campo requerido
            .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Patrón regex adicional
            .messages({
                'string.email': 'Invalid email address',
                'any.required': 'Email is required'
            }),

        firstName: Joi.string()
            .min(3) // Longitud mínima de 3 caracteres
            .max(30) // Longitud máxima de 30 caracteres
            .required() // Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),


        lastName: Joi.string()
            .min(3) // Longitud mínima de 3 caracteres
            .max(30) // Longitud máxima de 30 caracteres
            .required() // Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),


        age: Joi.number()
            .min(18) // Edad mínima de 18
            .max(150) // Edad máxima de 150
            .messages({
                'number.min': 'Invalid age, must be at least 18',
                'number.max': 'Invalid age, must be at most 150'
            })
    }),

    Yo: Joi.object({
        id: Joi.number()
            .min(1)
            .optional() // El id es opcional
            .messages({
                'number.base': 'ID must be a number',
                'number.min': 'ID must be greater than or equal to 1'
            }),
        email: Joi.string()
            .email() // Valida que sea un correo electrónico
            .required() // Campo requerido
            .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Patrón regex adicional
            .messages({
                'string.email': 'Invalid email address',
                'any.required': 'Email is required'
            }),

        name: Joi.string()
            .min(3) // Longitud mínima de 3 caracteres
            .max(30) // Longitud máxima de 30 caracteres
            .required() // Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),

        age: Joi.number()
            .min(18) // Edad mínima de 18
            .max(150) // Edad máxima de 150
            .messages({
                'number.min': 'Invalid age, must be at least 18',
                'number.max': 'Invalid age, must be at most 150'
            })
    }),
    Product: Joi.object({
        id: Joi.number()
            .min(1)
            .optional() // El id es opcional
            .messages({
                'number.base': 'ID must be a number',
                'number.min': 'ID must be greater than or equal to 1'
            }),
        name: Joi.string()
            .min(3) // Longitud mínima de 3 caracteres
            .max(30) // Longitud máxima de 30 caracteres
            .required() // Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),
        description: Joi.string()
            .min(3) // Longitud mínima de 3 caracteres
            .max(30) // Longitud máxima de 30 caracteres
            .required() // Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),

        price: Joi.number()
            .min(18) // Edad mínima de 18
            .max(150) // Edad máxima de 150
            .messages({
                'number.min': 'Invalid age, must be at least 18',
                'number.max': 'Invalid age, must be at most 150'
            }),
        stock: Joi.number()
            .min(18) // Edad mínima de 18
            .max(150) // Edad máxima de 150
            .messages({
                'number.min': 'Invalid age, must be at least 18',
                'number.max': 'Invalid age, must be at most 150'
            })
    }),
    Evaluation: Joi.object({
        id: Joi.alternatives().try(
            Joi.number().min(1),         // Permite números con un valor mínimo de 1
            Joi.string().alphanum().min(1) // Permite cadenas alfanuméricas con al menos 1 carácter
        )
            .optional() // El id sigue siendo opcional
            .messages({
                'alternatives.match': 'ID must be a number or alphanumeric string',
                'number.min': 'ID (number) must be greater than or equal to 1',
                'string.min': 'ID (string) must have at least 1 character',
                'string.alphanum': 'ID must contain only letters and numbers'
            }),
        productId: Joi.number()
            .min(1) // Edad mínima de 18
            .max(150) // Edad máxima de 150
            .messages({
                'number.min': 'Invalid productId, must be at least 18',
                'number.max': 'Invalid productId, must be at most 150'
            }),
        rating: Joi.number()
            .min(1) // Edad mínima de 18
            .max(1000) // Edad máxima de 150
            .messages({
                'number.min': `Invalid evaluation,min`,
                'number.max': `Invalid evaluation,max`
            }),
        review: Joi.string()
            .min(3) // Longitud mínima de 3 caracteres
            .max(30) // Longitud máxima de 30 caracteres
            .optional() // El id sigue siendo opcional// Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),
        status_Evaluation: Joi.bool()
            .optional() // El id sigue siendo opcional// Campo requerido
            .messages({
                'string.min': 'Name must be at least 3 characters long',
            }),


    }),

}

// id
// productId
// rating
// review|