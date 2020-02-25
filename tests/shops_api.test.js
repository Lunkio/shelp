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
beforeAll((done) => {
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

describe('when some shops are saved in db', () => {
    beforeEach(async () => {
        await Shop.deleteMany({})
        for (let i = 0; i < helper.testShops.length; i++) {
            let newShop = helper.testShops[i]
            await api.post('/api/shops').send(newShop)
        }
    })

    describe('get-method', () => {
        it('shops are returned as json', async () => {
            await api
                .get('/api/shops')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        it('all shops are returned', async () => {
            const res = await api.get('/api/shops')
            expect(res.body.length).toBe(helper.testShops.length)
        })

        it('specific shop is in returned shops', async () => {
            const res = await api.get('/api/shops')
            const shops = res.body.map(s => s.name)
            expect(shops).toContain('K-Kauppa')
        })

        it('shops have id\'s', async () => {
            const res = await api.get('/api/shops')
            const shop = res.body[0]
            expect(shop.id).toBeDefined()
        })
    })

    describe('post-method', () => {
        it('shop with correct info can be added', async () => {
            const newShop = {
                name: 'Test Shop',
                email: 'test@shopa.fi',
                password: 'secret4',
                address: 'Teststreet 1',
                zip: '20200',
                city: 'Turku',
                phone: '123456789',
                website: 'test.com'
            }

            await api
                .post('/api/shops')
                .send(newShop)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const res = await api.get('/api/shops')
            expect(res.body.length).toBe(helper.testShops.length +1)
        })

        it('shop with wrong info cannot be added', async () => {
            const newShop = {
                email: 'test@shopa.fi',
                password: 'secret4',
                address: 'Teststreet 1',
                zip: '20200',
                city: 'Turku',
                phone: '123456789',
                website: 'test.com'
            }

            await api
                .post('/api/shops')
                .send(newShop)
                .expect(400)

            const shopsAfter = await helper.shopsInDb()
            expect(shopsAfter.length).toBe(helper.testProducts.length)
        })
    })

    describe('put-method', () => {
        it('shop cannot be edited without proper token', async () => {
            const shopsBefore = await helper.shopsInDb()
            const shopToEdit = shopsBefore[1]
            shopToEdit.name = 'New Test Shop'
            
            await api
                .put(`/api/shops/${shopToEdit.id}`)
                .send(shopToEdit)
                .expect(401)

            const shopsAfter = await helper.shopsInDb()
            const names = shopsAfter.map(s => s.name)
            expect(names).not.toContain('New Test Shop')
        })
        
        it('shop can be edited', async () => {
            const shopsBefore = await helper.shopsInDb()
            const shopToEdit = shopsBefore[1]
            shopToEdit.name = 'New Test Shop'
            
            await api
                .put(`/api/shops/${shopToEdit.id}`)
                .set('Authorization', `bearer ${token}`)
                .send(shopToEdit)
                .expect(200)

            const shopsAfter = await helper.shopsInDb()
            const names = shopsAfter.map(s => s.name)
            expect(names).toContain('New Test Shop')
        })
    })

    describe('delete-method', () => {
        it('shop cannot be deleted without proper token', async () => {
            const shopsBefore = await helper.shopsInDb()
            const shopToDelete = shopsBefore[0]

            await api
                .delete(`/api/shops/${shopToDelete.id}`)
                .expect(401)

            const shopsAfter = await helper.shopsInDb()
            expect(shopsAfter.length).toBe(helper.testShops.length)
        })

        it('shop can be deleted', async () => {
            const shopsBefore = await helper.shopsInDb()
            const shopToDelete = shopsBefore[0]
            const id = shopToDelete.id

            await api
                .delete(`/api/shops/${shopToDelete.id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)

            const shopsAfter = await helper.shopsInDb()
            expect(shopsAfter.length).toBe(helper.testShops.length -1)

            const ids = shopsAfter.map(s => s.id)
            expect(ids).not.toContain(id)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})