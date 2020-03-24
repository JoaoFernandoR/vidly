const auth = require('../middleware/auth')
const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const { User, ValidateUser } = require('../schemas/User')
const _ = require('lodash')
const bcrypt = require('bcrypt')

routes.get('/', async (req, res) => {
    const user = await User.find().sort({name : 1}).select('-__v -password')
    res.send(user)
})

// Se não passar pela autenticação nunca chega á funçaõ de callback da rota.
routes.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})


routes.post('/', async (req, res) => {
    const result = ValidateUser(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    
    let user = await User.findOne({email : result.value.email})

    if (user)
        return res.status(404).send('User already registered')

    user = new User(_.pick(result.value, ['name', 'email', 'password'])) 
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)   

    await user.save()

    const token = user.generateAuthToken()

    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']))
})




module.exports = routes