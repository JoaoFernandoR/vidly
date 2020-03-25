require('express-async-errors');
const morgan = require('morgan')
const winston = require('winston')
const fs = require('fs')
const path = require('path')

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(`DEBUG: ${process.env.DEBUG}`)
// console.log(`server: ${server.get('env')}`)

// Configuration
// console.log('Application Name: ' + config.get('name'))    
// console.log('Mail server: ' + config.get('mail.host'))
// console.log('password server: ' + config.get('mail.password'))    


module.exports = (server) => {
    

    winston.add( new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        )
    }))
    
     winston.add( new winston.transports.File({
        filename: 'logfile.log',
        format: winston.format.combine( 
            winston.format.timestamp({ format : 'YYYY-MM-DD HH:mm:ss'}), 
            winston.format.json(),
            winston.format.prettyPrint() )
    }))

    if (server.get('env') === 'development') {
        var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        server.use(morgan(':date[web] :method :status :response-time ms', {stream : accessLogStream}))    
        winston.info('Morgan enabled')
    }

    winston.exceptions.handle({
        transports : [
            new winston.transports.File({
                filename : 'uncaughtExceptions.log',
                format: winston.format.combine( 
                    winston.format.timestamp({ format : 'YYYY-MM-DD HH:mm:ss'}), 
                    winston.format.json(),
                    winston.format.prettyPrint() ) 
            }),
            new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )}
            )
        ]
    })
    
    process.on('unhandledRejection', (ex) => {
        throw ex
    })
    

}