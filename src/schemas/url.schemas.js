import joi from 'joi'

export const urlsSchemas = joi.object(
    {
        url: joi.string().uri().required()
    }
)