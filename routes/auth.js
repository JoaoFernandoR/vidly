const express = require('express')
const routes = express.Router()
const _ = require('lodash')
// Validation Stuff
const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt')
// Schemas
const { User } = require('../schemas/User')

routes.get('/', async (req, res) => {
    const user = await User.find().sort({name : 1}).select('-__v -password')
    res.send(user)
})


routes.post('/', async (req, res) => {
    const result = Validate(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    
    let user = await User.findOne({email : result.value.email})

    if (!user)
        return res.status(404).send('Invalid email or password')

    const validPassword = await bcrypt.compare(result.value.password, user.password)

    if(!validPassword)
        return res.status(400).send('Invalid email or password')

        const token = user.generateAuthToken()
        res.send(token)

    res.send(token)    



})


const Validate = (entrada) => {

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
          email : Joi.string().min(5).required().max(50).email(),
          password : passwordComplexity(complexityOptions)
      })
  
      return schema.validate(entrada)
  }


module.exports = routes