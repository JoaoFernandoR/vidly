const express = require('express')
const routes = express.Router()

const ValidateInput = require('../ValidateInput')

genres = [
    {id : 1, genero : 'romance'},
    {id : 2, genero : 'terror'},
    {id : 3, genero : 'comédia'},
]



//Aqui iramos mudar api/genres, apenas para "/" porque em vidly.js já definimos a rota /api/genres
routes.get('/', (req, res) => {
    res.send(genres)
})

routes.get('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id))

    if (!genre) 
        return res.status(404).send('Não há nenhum gênero com esse ID') 

    res.send(genre.genero)
})

//Rotas de Post

routes.post('/', (req, res) => {

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

routes.put('/:id', (req, res) => {
   
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

routes.delete('/:id', (req, res) => {

    // Learn to not get the same ID in the array after deleting a entry.
    // But after all when i learn to deal with databases the ID will be assign automatically.

    const genre = genres.find(c => c.id === parseInt(req.params.id))
    
    if (!genre) 
        return res.status(404).send('Não há nenhum gênero com esse ID') 

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)

})


module.exports = routes