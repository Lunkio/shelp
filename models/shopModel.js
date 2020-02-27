const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    latitude: Number,
    longitude: Number,
    website: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

shopSchema.plugin(uniqueValidator)

shopSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop