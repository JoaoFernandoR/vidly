const winston = require('winston')
const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser : true, 
        useUnifiedTopology : true, 
        useFindAndModify : false, 
        useCreateIndex : true
    })
    .then(() => winston.info('Connected to the Database...'))

}
    
/* 
.catch((err) => winston.info('Não conectado a database', err.message))    
Com a nova implementação de lidarmos com promessas rejeitadas, não precisamos mais 
utilizar o método .catch(), apenas logando no console o erro, queremos que o winston lide com isso.
*/
