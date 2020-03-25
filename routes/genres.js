const express = require('express')
const routes = express.Router()
// Modules
const { Genre, ValidateInput } = require('../schemas/Genre')
// Middlewares
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

routes.get('/', async (req, res) => {

    const genre = await Genr.find().sort({genero : 1}).select({_id : 1, genero : 1})

    res.send(genre)

})

routes.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.find({_id : req.params.id})
        res.send(genre[0].genero)

    }
    catch(err) {
        res.status(404).send('Não há nenhum gênero com esse id.')
    }

})

routes.post('/', auth, async (req, res) => {

    const result = ValidateInput(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    
    const findInDb = await Genre.find({genero : req.body.genero})

    if(findInDb.length >= 1)
        return res.status(400).send('Já existe esse gênero no bando de dados...')

    try{

        const genre = new Genre({
            genero : result.value.genero
        })
    
        await genre.save()

        res.send(genre)

    }
    catch(err) { 
        console.log('erro :', err)
    }

})

routes.put('/:id', async (req, res) => {
    try{

    const findInDb = await Genre.find({genero : req.body.genero})
    
    if(findInDb.length >= 1)
        return res.status(400).send('Já existe esse gênero no bando de dados...')
        
    const result = ValidateInput(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        genero : result.value.genero
    }, {new : true})
    res.send(genre)

    }
    catch(err) {
        res.status(404).send("Não há no banco de dados documento com esse ID")
    }

    

})


routes.delete('/:id',[auth, admin], async (req, res) => {

    try {
        const genre = await Genre.findByIdAndRemove(req.params.id)
        res.send(genre)

    }
    catch(err) {
        res.status(404).send('Não há nenhum gênero com esse id.')
    }

})


module.exports = routes