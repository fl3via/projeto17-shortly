import joi from 'joi'

export const authSchemas = joi.object({

    email: joi.string().email().required(),
    password: joi.string().required()

})