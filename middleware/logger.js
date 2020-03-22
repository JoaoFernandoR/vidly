const logger = (req, res, next) => {
    // db("Logging...")
    next()
}

module.exports = logger