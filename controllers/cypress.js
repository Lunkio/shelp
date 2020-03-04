const cypressRouter = require('express').Router()
const Buyer = require('../models/buyerModel')
const Product = require('../models/productModel')
const Shop = require('../models/shopModel')
//const Image = require('../models/imageModel')

cypressRouter.post('/reset', async (req, res) => {
    await Buyer.deleteMany({})
    await Product.deleteMany({})
    await Shop.deleteMany({})
    //await Image.deleteMany({})

    res.status(204).end()
})

module.exports = cypressRouter