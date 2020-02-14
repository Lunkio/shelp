const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    location: { type: String, required: true },
    contentType: { type: String, required: true }
})

imageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image