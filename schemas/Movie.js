const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const { Genres } = require('./Genre')

const Movies = new mongoose.Schema({
    title : {
        type : String,
        min : 3,
        max : 50,
        required : true,
        trim : true,
        unique : true
    },
    genre : {
        type : Genres,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255,
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255,
    }
})

const Movie = mongoose.model('Movies', Movies)


const ValidateInput = (entrada) => {

    const schema = Joi.object({
        title : Joi.string().min(3).required().max(50),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).required().max(255),
        dailyRentalRate : Joi.number().min(0).required().max(255),
    })

    return schema.validate(entrada)
}

module.exports.Movie = Movie
module.exports.ValidateInput = ValidateInput