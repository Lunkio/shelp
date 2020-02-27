const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shopsRouter = require('express').Router()
const Shop = require('../models/shopModel')

shopsRouter.get('/', async (req, res ,next) => {
    try {
        const shops = await Shop.find({})
        res.json(shops.map(s => s.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

shopsRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const shop = new Shop({
            name: body.name,
            email: body.email,
            address: body.address,
            zip: body.zip,
            city: body.city,
            phone: body.phone,
            latitude: body.latitude,
            longitude: body.longitude,
            website: body.website,
            passwordHash
        })

        const savedShop = await shop.save()
        res.json(savedShop.toJSON())

    } catch (exception) {
        next(exception)
    }
})

shopsRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const shop = await Shop.findById(decodedToken.id)

        if (shop) {
            const shop = {
                name: body.name,
                email: body.email,
                address: body.address,
                zip: body.zip,
                city: body.city,
                phone: body.phone,
                latitude: body.latitude,
                longitude: body.longitude,
                website: body.website
            }
    
            const modifiedShop = await Shop.findByIdAndUpdate(req.params.id, shop, { new: true })
            res.json(modifiedShop.toJSON())

        } else {
            return res.status(401).json({ error: 'only registered shop can edit its details' })
        }
    } catch (exception) {
        next(exception)
    }
})

shopsRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const shop = await Shop.findById(decodedToken.id)

        if (shop) {
            await Shop.findByIdAndRemove(req.params.id)
            res.status(204).end()
        } else {
            return res.status(401).json({ error: 'only registered shop can edit its details' })
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = shopsRouter