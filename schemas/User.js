const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken')
const config = require('config')

const ValidateUser = (entrada) => {

  const complexityOptions = {
    min: 5,
    max: 255,
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
    maxlength : 255,
    required : true,
  },
  isAdmin : Boolean  
})

// Como estamo referenciando com this, não podemos usar a arrow function.
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id : this._id, isAdmin : this.isAdmin}, config.get('jwtPrivateKey'))
  return token
}

const User = mongoose.model('User', userSchema)

module.exports.User = User
module.exports.ValidateUser = ValidateUser

