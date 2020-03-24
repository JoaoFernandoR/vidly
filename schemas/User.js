const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity');

const ValidateUser = (entrada) => {

  const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  }

    const schema = Joi.object({
        name : Joi.string().min(5).required().max(50),
        email : Joi.string().min(5).required().max(50).email(),
        password : passwordComplexity(complexityOptions)
    })

    

    return schema.validate(entrada)
}

const userSchema = new mongoose.Schema({
  name : {
      type : String,
      minlength : 5,
      maxlength : 50,
      trim : true,
      required : true
  },
  email : {
    type : String,
    minlength : 5,
    maxlength : 50,
    trim : true,
    unique : true,
    required : true
  },
  password : {
    type : String,
    minlength : 5,
    maxlength : 30,
    required : true,
  }  
})

const User = mongoose.model('User', userSchema)

module.exports.User = User
module.exports.ValidateUser = ValidateUser

