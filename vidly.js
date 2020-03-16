const config = require('config')
const express = require('express')
const server = express()
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

// MiddleWares
const ValidateInput = require('./ValidateInput')
const logger = require('./logger.js')
const authenticator = require('./authenticator.js')

server.use(helmet())
server.use(logger)
server.use(authenticator)
server.use(express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended : false}))

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`server: ${server.get('env')}`)

// Configuration
console.log('Application Name: ' + config.get('name'))    
console.log('Mail server: ' + config.get('mail.host'))
console.log('password server: ' + config.get('mail.password'))    



if (server.get('env') === 'development') {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // setup the logger
    server.use(morgan('tiny', {stream : accessLogStream}))    
    console.log('Morgan enabled...')
}

genres = [
    {id : 1, genero : 'romance'},
    {id : 2, genero : 'terror'},
    {id : 3, genero : 'comédia'},
]

//Rotas de Get
server.get('/', (req, res) => {
    res.send('Esta é a página inicial')
})

server.get('/api/genres', (req, res) => {
    res.send(genres)
})

server.get('/api/genres/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id))

    if (!genre) 
        return res.status(404).send('Não há nenhum gênero com esse ID') 

    res.send(genre.genero)
})

//Rotas de Post

server.post('/api/genres', (req, res) => {

    const result = ValidateInput(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    const sameGenre  = genres.find(c => c.genero === req.body.genero)

    if (sameGenre)
        return res.status(400).send('Já existe um gênero com esse mesmo nome')

    newGenre = {
        id : genres.length + 1,
        genero : req.body.genero
    }

    genres.push(newGenre)

    res.send(newGenre)
})

// Atualizando uma entrada

server.put('/api/genres/:id', (req, res) => {
   
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    
    if (!genre) 
        return res.status(404).send('Não há nenhum gênero com esse ID') 

    const sameGenre  = genres.find(c => c.genero === req.body.genero)

    if (sameGenre)
        return res.status(400).send('Já existe um gênero com esse mesmo nome')
    
    const result = ValidateInput(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    
    genre.genero = req.body.genero
    res.send(genre)   

})

//Deletando uma entrada

server.delete('/api/genres/:id', (req, res) => {

    // Learn to not get the same ID in the array after deleting a entry.
    // But after all when i learn to deal with databases the ID will be assign automatically.

    const genre = genres.find(c => c.id === parseInt(req.params.id))
    
    if (!genre) 
        return res.status(404).send('Não há nenhum gênero com esse ID') 

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)

})

server.listen(3000, () => console.log('Porta 3000 aberta. Escutando...'))