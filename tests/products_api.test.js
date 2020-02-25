const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Product = require('../models/productModel')
const Image = require('../models/imageModel')
const Shop = require('../models/shopModel')
const supertest = require('supertest')
const api = supertest(app)

//asettaa tokenin
let token
beforeAll(async (done) => {
    await Shop.deleteMany({})
    //lisää kaupat db
    for (let i = 0; i < helper.testShops.length; i++) {
        let newShop = helper.testShops[i]
        await api.post('/api/shops').send(newShop)
    }
    supertest(app)
        .post('/api/login')
        .send({
            name: 'K-Kauppa',
            password: 'secret1'
        })
        .end((err, res) => {
            token = res.body.token
            done()
        })
})

describe('when some products are saved in db', () => {
    beforeEach(async () => {
        await Product.deleteMany({})
        await Image.deleteMany({})

        //lisää kuvat db
        for (let i = 0; i < helper.testImages.length; i++) {
            let newTestImage = new Image(helper.testImages[i])
            await newTestImage.save()
        }
        //lisää tuotteet db
        for (let i = 0; i < helper.testProducts.length; i++) {
            let newTestProduct = new Product(helper.testProducts[i])
            let images = await Image.find({})
            let shops = await Shop.find({})
            newTestProduct.img = images[i]._id
            newTestProduct.shop = shops[i]._id
            await newTestProduct.save()
        }
    })

    describe('get-method', () => {
        it('products are returned as json', async () => {
            await api
                .get('/api/products')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        it('all products are returned', async () => {
            const res = await api.get('/api/products')
            expect(res.body.length).toBe(helper.testProducts.length)
        })

        it('specific product is in returned products', async () => {
            const res = await api.get('/api/products')
            const products = res.body.map(p => p.description)
            expect(products).toContain('Lasagne')
        })

        it('products have id\'s', async () => {
            const res = await api.get('/api/products')
            const product = res.body[0]
            expect(product.id).toBeDefined()
        })
    })

    describe('post-method', () => {
        it('product cannot be added without proper token', async () => {
            const newImage = new Image(helper.testImages[0])
            await newImage.save()
            const image = await Image.findOne({ filename: '123456789.jpg' })
            const shop = await Shop.findOne({ name: 'K-Kauppa' })

            const newProduct = helper.testProducts[0]
            newProduct.imgId = image._id
            newProduct.shop = shop._id

            await api
                .post('/api/products')
                .send(newProduct)
                .expect(401)

            const res = await api.get('/api/products')
            expect(res.body.length).toBe(helper.testProducts.length)
        })

        it('product with correct info can be added', async () => {
            const newImage = new Image(helper.testImages[0])
            await newImage.save()
            const image = await Image.findOne({ filename: '123456789.jpg' })
            const shop = await Shop.findOne({ name: 'K-Kauppa' })

            const newProduct = helper.testProducts[0]
            newProduct.imgId = image._id
            newProduct.shop = shop._id

            await api
                .post('/api/products')
                .set('Authorization', `bearer ${token}`)
                .send(newProduct)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const res = await api.get('/api/products')
            expect(res.body.length).toBe(helper.testProducts.length +1)
        })

        it('product with wrong info cannot be added', async () => {
            const newImage = new Image(helper.testImages[1])
            await newImage.save()
            const image = await Image.findOne({ filename: '987654321.jpg' })
            const shop = await Shop.findOne({ name: 'K-Kauppa' })

            const falsyProduct = {
                price: 7,
                availability: true,
                imgId: image._id,
                shop: shop._id
            }

            await api
                .post('/api/products')
                .set('Authorization', `bearer ${token}`)
                .send(falsyProduct)
                .expect(400)

            const productsAfterPost = await helper.productsInDb()
            expect(productsAfterPost.length).toBe(helper.testProducts.length)
        })
    })

    describe('put-method', () => {
        it('product cannot be edited without proper token', async () => {
            const productsBefore = await helper.productsInDb()
            const productToEdit = productsBefore[0]
            productToEdit.description = 'New description'
            const image = await Image.findById(productToEdit.img.id)
            productToEdit.img = image.id

            await api
                .put(`/api/products/${productToEdit.id}`)
                .send(productToEdit)
                .expect(401)

            const productsAfter = await helper.productsInDb()
            const descriptions = productsAfter.map(p => p.description)
            expect(descriptions).not.toContain('New description')
        })

        it('product can be edited', async () => {
            const productsBefore = await helper.productsInDb()
            const productToEdit = productsBefore[0]
            productToEdit.description = 'New description'
            const image = await Image.findById(productToEdit.img.id)
            productToEdit.img = image.id

            await api
                .put(`/api/products/${productToEdit.id}`)
                .set('Authorization', `bearer ${token}`)
                .send(productToEdit)
                .expect(200)

            const productsAfter = await helper.productsInDb()
            const descriptions = productsAfter.map(p => p.description)
            expect(descriptions).toContain('New description')
        })
    })

    describe('delete-method', () => {
        it('product can be deleted', async () => {
            const productsBefore = await helper.productsInDb()
            const productToDelete = productsBefore[0]
            const id = productToDelete.id

            await api
                .delete(`/api/products/${productToDelete.id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)

            const productsAfter = await helper.productsInDb()
            expect(productsAfter.length).toBe(helper.testProducts.length -1)

            const ids = productsAfter.map(p => p.id)
            expect(ids).not.toContain(id)
        })

        it('product cannot be deleted without proper token', async () => {
            const productsBefore = await helper.productsInDb()
            const productToDelete = productsBefore[0]

            await api
                .delete(`/api/products/${productToDelete.id}`)
                .expect(401)

            const productsAfter = await helper.productsInDb()
            expect(productsAfter.length).toBe(helper.testProducts.length)
        })
    })

    describe('availability-method', () => {
        it('bought product availability changes to false', async () => {
            const productsBefore = await helper.productsInDb()
            const product = productsBefore[0]
            product.availability = false

            await api
                .put(`/api/products/availability/${product.id}`)
                .send(product)
                .expect(200)

            const productsAfter = await helper.productsInDb()
            const availabilites = productsAfter.map(p => p.availability)
            expect(availabilites).toContain(false)

            const editedProduct = await Product.findById(product.id)
            expect(editedProduct.availability).toBe(false)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})