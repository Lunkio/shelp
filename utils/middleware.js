const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    } else {
        return null
    }
}

const tokenExtractor = (req, res, next) => {
    req.token = getTokenFrom(req)
    next()
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return (res.status(401).json({ error: 'invalid token'}))
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}