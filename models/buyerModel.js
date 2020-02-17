const mongoose = require('mongoose')

const buyerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    products: { type: Array, required: true },
    paymentID: { type: String },
    payerID: { type: String },
    timeOfPurchase: { type: Date, default: Date.now }
})

buyerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Buyer = mongoose.model('Buyer', buyerSchema)

module.exports = Buyer