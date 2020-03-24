const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const ValidateInput = (entrada) => {

    const schema = Joi.object({
        name : Joi.string().min(3).required().max(20),
        isGold : Joi.boolean().required(),
        phone : Joi.number().required()
    })

    return schema.validate(entrada)
}

const Customers = new mongoose.Schema({
    name : {
        type : String,
        required: true,    
        minlength : 3,
        max : 20,
        trim : true
    },
    isGold : {
        type : Boolean,
        default : false,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10,
        maxlength : 25,
        unique : true
    }
})

const Customer = mongoose.model('Customers', Customers)

module.exports.Customer = Customer
module.exports.ValidateInput = ValidateInput