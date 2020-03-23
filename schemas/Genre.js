const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const ValidateInput = (entrada) => {

    const schema = Joi.object({
        genero : Joi.string().min(3).required().max(20)
    })

    return schema.validate(entrada)
}

// Fazendo um schema
const Genres = new mongoose.Schema({
    genero : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
        trim : true
    }
})

// Criando uma classe de nome Genre e collection "genres" a partir do schema.
const Genre = mongoose.model('Genres', Genres)

module.exports.Genre = Genre
module.exports.ValidateInput = ValidateInput