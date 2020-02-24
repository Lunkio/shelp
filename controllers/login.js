const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Shop = require('../models/shopModel')

loginRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const shop = await Shop.findOne({ name: body.name })
        const correctPsw = shop === null
            ? false
            : await bcrypt.compare(body.password, shop.passwordHash)
    
        if (!(shop && correctPsw)) {
            return res.status(401).json({ error: 'invalid username or password' })
        }
    
        const shopToken = {
            name: shop.name,
            id: shop._id
        }
    
        const token = jwt.sign(shopToken, process.env.SECRET)
    
        res.status(200).send({ token, name: shop.name, id: shop._id })
        
    } catch (exception) {
        next(exception)
    }
})

module.exports = loginRouter