const startupDebugger = require('debug')('startup')
const dbDebugger = require('debug')('db')

const config = require('config')
const express = require('express')
const server = express()
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
//rotas
const genres = require('./routes/genres')
const inicial = require('./routes/inicial')

// MiddleWares
const logger = require('./middleware/logger.js')
const authenticator = require('./middleware/authenticator.js')

server.use(helmet())
server.use(logger)
server.use(authenticator)
server.use(express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended : false}))

//Rotas
server.use('/', inicial)
server.use('/api/genres', genres)

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`DEBUG: ${process.env.DEBUG}`)
console.log(`server: ${server.get('env')}`)

// Configuration
console.log('Application Name: ' + config.get('name'))    
console.log('Mail server: ' + config.get('mail.host'))
// console.log('password server: ' + config.get('mail.password'))    



if (server.get('env') === 'development') {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // setup the logger
    server.use(morgan('tiny', {stream : accessLogStream}))    
    // console.log('Morgan enabled...')
    startupDebugger('Morgan enabled')
}

//Db work...
dbDebugger('Connected to the database...')

server.listen(3000, () => console.log('Porta 3000 aberta. Escutando...'))