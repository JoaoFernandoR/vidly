const startupDebugger = require('debug')('startup')
const dbDebugger = require('debug')('db')

const express = require('express')
const server = express()
// const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
//rotas
const genres = require('./routes/genres')
const inicial = require('./routes/inicial')
const customers = require('./routes/customers')
const movies = require('./routes/movies')

// MiddleWares
const logger = require('./middleware/logger.js')
const authenticator = require('./middleware/authenticator.js')

server.use(helmet())
server.use(express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended : false}))
server.use(logger)
server.use(authenticator)

if (server.get('env') === 'development') {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // setup the logger
    server.use(morgan(':date[web] :method :status :response-time ms', {stream : accessLogStream}))    
    // console.log('Morgan enabled...')
    startupDebugger('Morgan enabled')
}


//Rotas
server.use('/', inicial)
server.use('/api/genres', genres)
server.use('/api/customers', customers)
server.use('/api/movies', movies)

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(`DEBUG: ${process.env.DEBUG}`)
// console.log(`server: ${server.get('env')}`)

// Configuration
// console.log('Application Name: ' + config.get('name'))    
// console.log('Mail server: ' + config.get('mail.host'))
// console.log('password server: ' + config.get('mail.password'))    

//Db work...
mongoose.connect('mongodb://localhost/playground', 
{useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false}
).then(() => console.log('Connected to the Database...'))
.catch((err) => console.log('Não conectado a database', err.message))    


server.listen(3000, () => console.log('Porta 3000 aberta. Escutando...'))