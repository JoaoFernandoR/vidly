const express = require('express')
const routes = express.Router()
const ValidateInput = require('../ValidateInput')
const Genre = require('../schemas/Genre')

//Aqui iramos mudar api/genres, apenas para "/" porque em vidly.js já definimos a rota /api/genres
routes.get('/', async (req, res) => {
    const genre = await Genre.find().sort({genero : 1}).select({_id : 1, genero : 1})
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

//Rotas de Post
routes.post('/', async (req, res) => {

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
    
        const newGenre = await genre.save()
        res.send(newGenre)
    }catch(err) { console.log('erro :', err)}

})

// Atualizando uma entrada

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

//Deletando uma entrada

routes.delete('/:id', async (req, res) => {

    try {
        const genre = await Genre.findByIdAndRemove(req.params.id)
        res.send(genre)

    }
    catch(err) {
        res.status(404).send('Não há nenhum gênero com esse id.')
    }

})


module.exports = routes