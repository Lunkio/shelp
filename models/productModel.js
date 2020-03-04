const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    availability: { type: Boolean, required: true },
    shop: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
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