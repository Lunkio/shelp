const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    website: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

shopSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop