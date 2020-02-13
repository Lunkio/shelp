const productsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Product = require('../models/productModel')
const Shop = require('../models/shopModel')

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.json(products.map(p => p.toJSON()))

    } catch (exception) {
        next(exception)
    }
})

productsRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const shop = await Shop.findById(decodedToken.id)

        const product = new Products({
            price: body.price,
            description: body.description,
            availability: true,
            shop: shop._id
        })

        const savedProduct = await product.save()

        shop.products = shop.products.concat(savedProduct._id)
        await shop.save()

        res.json(savedProduct.toJSON())

    } catch (exception) {
        next(exception)
    }
})

productsRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const product = {
            price: body.price,
            description: body.description,
            availability: body.availability
        }

        const modifiedProduct = await Product.findByIdAndUpdate(req.params.id, product, { new: true })
        res.json(modifiedProduct.toJSON())

    } catch (exception) {
        next(exception)
    }
})

productsRouter.delete('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        const shop = await Shop.findById(decodedToken.id)

        if (product.shop.toString() === shop.id.toString()) {
            await Product.findByIdAndRemove(req.params.id)
            res.status(204).end()
        } else {
            return res.status(401).json({ error: 'only logged in shop can delete products' })
        }
        
    } catch (exception) {
        next(exception)
    }  
})

module.exports = productsRouter