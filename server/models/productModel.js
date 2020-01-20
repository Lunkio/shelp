const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    description: { type: String, required: true },
    availability: { type: Boolean, required: true },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product