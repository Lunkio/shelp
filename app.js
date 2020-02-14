const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const productsRouter = require('./controllers/products')
const shopsRouter = require('./controllers/shops')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const Image = require('./models/imageModel')

// nämä tarvitaan img uploadiin
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

app.use(bodyParser.json())

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log('Connected to MongoDB') })
    .catch((error) => { console.log('Error', error.message) })

// tarvitaan img uploadiin
const conn = mongoose.createConnection(config.MONGODB_URI)
let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: config.MONGODB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

app.post('/api/products/image', upload.single('img'), async (req, res, next) => {
    const newImage = new Image({
        filename: req.file.filename,
        location: `api/products/image/${req.file.filename}`,
        contentType: req.file.contentType
    })
    try {
        const savedImage = await newImage.save()
        res.json(savedImage.toJSON())
    } catch (exception) {
        next(exception)
    }
})

app.delete('/api/products/images/:id', async (req, res, next) => {
    try {
        await Image.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next (exception)
    }
})

app.use(cors())

app.use(middleware.tokenExtractor)

app.use('/api/products', productsRouter)
app.use('/api/shops', shopsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app