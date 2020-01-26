const productsRouter = require('express').Router()
const Product = require('../models/productModel')
//const Shop = require('../models/shopModel')

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.json(products.map(p => p.toJSON()))

    } catch (exception) {
        next(exception)
    }
})

productsRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        //const shop = await Shop.findById(id)

        const product = new Products({
            price: body.price,
            description: body.description,
            availability: true,
            // shop: shop._id
        })

        const savedProduct = await product.save()
        res.json(savedProduct.toJSON())

    } catch (exception) {
        next(exception)
    }
})

productsRouter.put('/:id', async (req, res, next) => {
    try {
        const body = req.body

        //const shop = await Shop.findById(id)

        const product = {
            price: body.price,
            description: body.description,
            availability: body.availability,
            // shop: shop._id
        }

        const modifiedProduct = await Product.findByIdAndUpdate(req.params.id, product, { new: true })
        res.json(modifiedProduct.toJSON())

    } catch (exception) {
        next(exception)
    }
})

productsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Product.findByIdAndRemove(req.params.id)
        res.status(204).end()

    } catch (exception) {
        next(exception)
    }  
})

module.exports = productsRouter