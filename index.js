const express = require('express')
const server = express()
const winston = require('winston')

require('./startup/logging')(server)
require('./startup/routes')(server);
require('./startup/db')();
require('./startup/config')()

server.listen(3000, () => winston.info('Porta 3000 aberta. Escutando...'))