const bcrypt = require('bcryptjs')
const shopsRouter = require('express').Router()
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')

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
        const shop = {
            name: body.name,
            email: body.email,
            address: body.address,
            zip: body.zip,
            city: body.city,
            phone: body.phone,
            website: body.website
        }

        const modifiedShop = await Shop.findByIdAndUpdate(req.params.id, shop, { new: true })
        res.json(modifiedShop.toJSON())

    } catch (exception) {
        next(exception)
    }
})

shopsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Shop.findByIdAndRemove(req.params.id)
        res.status(204).end()

    } catch (exception) {
        next(exception)
    }
})

module.exports = shopsRouter