const express = require('express')
const mongoose = require('mongoose')
const routes = express.Router()
const { Movie, ValidateInput} = require('../schemas/Movie')
const { Genre } = require('../schemas/Genre')

routes.get('/', async (req, res) => {
    const movies = await Movie.find().sort({title : 1}).select('-__v')
    res.send(movies)
})

routes.post('/', async (req, res) => {
    const result = ValidateInput(req.body)
    
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    
    const findInDb = await Movie.find({title : req.body.title})
    
    if(findInDb.length >= 1)
        return res.status(400).send('Já existe esse gênero no bando de dados...')

    try{
        const genre = await Genre.findById(req.body.genreId);

        const movie = new Movie({
            title : result.value.title,
            genre: {
                _id: genre._id,
                genero: genre.genero
                },
            numberInStock : result.value.numberInStock,
            dailyRentalRate : result.value.dailyRentalRate
        })
    
        await movie.save()
        res.send(movie)
    }    
    catch(err){
        return res.status(400).send('Invalid genre.');
    }
})

routes.put('/:id', async (req, res) => {

    const result = ValidateInput(req.body)
    
    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    const findInDb = await Movie.find({title : req.body.title})

    if(findInDb.length >= 1)
        return res.status(400).send('Já existe esse filme no bando de dados...')

    try {
        const genre = await Genre.findById(req.body.genreId);

        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title : result.value.title,
            genre: {
                _id: genre._id,
                genero: genre.genero
                },
            numberInStock : result.value.numberInStock,
            dailyRentalRate : result.value.dailyRentalRate
        }, { new : true})           

        res.send(movie)
    }
    catch(err){
        res.send('Não há nenhum filme com esse ID ou o gênero não existe')
    }
})

routes.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).select('-__v')
        res.send(movie)    

    }
    catch(err) {
        res.status(404).send('Não há nenhum filme com esse ID')
    }

})

routes.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id).select('-__v')
        res.send(movie)    

    }
    catch(err) {
        res.status(404).send('Não há nenhum filme com esse ID')
    }

})


module.exports = routes


