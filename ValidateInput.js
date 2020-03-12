const Joi = require('@hapi/joi')

const ValidateInput = (entrada) => {

    const schema = Joi.object({
        genero : Joi.string().min(3).required()
    })

    return schema.validate(entrada)
}

module.exports = ValidateInput