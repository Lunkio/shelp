const buyersRouter = require('express').Router()
const Buyer = require('../models/buyerModel')
const Shop = require('../models/shopModel')

buyersRouter.get('/', async (req, res, next) => {
    try {
        const buyers = await Buyer.find({})
        res.json(buyers.map(b => b.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

buyersRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const buyer = new Buyer({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            address: body.address,
            city: body.city,
            zip: body.zip,
            phone: body.phone,
            products: body.products,
            paymentID: body.paymentID,
            payerID: body.payerID,            
            timeOfPurchase: new Date()
        })

        const savedBuyer = await buyer.save()
        res.json(savedBuyer.toJSON())

    } catch (exception) {
        next(exception)
    }
})

buyersRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const shop = await Shop.findById(decodedToken.id)

        if (shop) {
            await Buyer.findByIdAndRemove(req.params.id)
            res.status(204).end()
        } else {
            return res.status(401).json({ error: 'only logged in shop can delete buyers' })
        }
    } catch (exception) {
        next(exception)
    }
    
})

module.exports = buyersRouter