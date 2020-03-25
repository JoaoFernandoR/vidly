const express = require('express')
// Rotas 
const inicial = require('../routes/inicial')
const genres = require('../routes/genres')
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
// Middleware
const error = require('../middleware/error')

module.exports = (server) => {
    server.use(express.json())
    server.use(express.urlencoded({extended : false}))
    server.use('/', inicial)
    server.use('/api/genres', genres)
    server.use('/api/customers', customers)
    server.use('/api/movies', movies)
    server.use('/api/rentals', rentals)
    server.use('/api/users', users)
    server.use('/api/auth', auth)
    server.use(error)
}