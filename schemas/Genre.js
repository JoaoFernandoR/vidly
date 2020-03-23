const mongoose = require('mongoose')

// Fazendo um schema
const Genres = new mongoose.Schema({
    genero : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
        trim : true
    }
})

// Criando uma classe de nome Genre e collection "genres" a partir do schema.
const Genre = mongoose.model('Genres', Genres)

module.exports = Genre