import Joi from 'joi';


export const rulesValidations: object = {
    User: Joi.object({
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
    })

}

