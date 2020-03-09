const express = require('express')
const server = express()

meuteste = {
    ok : true
}

server.get('/', (req, res) => {
    res.send(meuteste)
})



server.listen(3000, () => console.log('Escutando na porta 3000...'))