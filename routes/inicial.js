const express = require('express')
const routes = express.Router()


//Rotas de Get
routes.get('/', (req, res) => {
    res.send('Esta é a página inicial')
})


module.exports = routes