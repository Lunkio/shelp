const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Buyer = require('../models/buyerModel')
const Shop = require('../models/shopModel')
const supertest = require('supertest')
const api = supertest(app)

//asettaa tokenin
let token
beforeAll(async (done) => {
    await Shop.deleteMany({})
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

describe('when some buyers are saved in db', () => {
    beforeEach(async () => {
        await Buyer.deleteMany({})
        for (let i = 0; i < helper.testBuyers.length; i++) {
            const newBuyer = new Buyer(helper.testBuyers[i])
            await newBuyer.save()
        }
    })

    describe('get-method', () => {
        it('buyers are returned as json', async () => {
            await api
                .get('/api/buyers')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        it('all buyers are returned', async () => {
            const res = await api.get('/api/buyers')
            expect(res.body.length).toBe(helper.testBuyers.length)
        })

        it('specific buyer is in returned buyers', async () => {
            const res = await api.get('/api/buyers')
            const buyers = res.body.map(b => b.lastName)
            expect(buyers).toContain('Testaaja')
        })

        it('buyers have id\'s', async () => {
            const res = await api.get('/api/buyers')
            const buyer = res.body[0]
            expect(buyer.id).toBeDefined()
        })
    })

    describe('post-method', () => {
        it('buyer with correct info can be added', async () => {
            const newBuyer = helper.testBuyers[0]

            await api
                .post('/api/buyers')
                .send(newBuyer)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const res = await api.get('/api/buyers')
            expect(res.body.length).toBe(helper.testBuyers.length +1)
        })

        it('buyer with wrong info cannot be added', async () => {
            const newBuyer = {
                firstName: 'Wont',
                lastName: 'Work'
            }

            await api
                .post('/api/buyers')
                .send(newBuyer)
                .expect(400)

            const buyersAfter = await helper.buyersInDb()
            expect(buyersAfter.length).toBe(helper.testBuyers.length)
        })
    })

    describe('delete-method', () => {
        it('buyer cannot be deleted without proper token', async () => {
            const buyersBefore = await helper.buyersInDb()
            const buyerToDelete = buyersBefore[0]

            await api
                .delete(`/api/buyers/${buyerToDelete.id}`)
                .expect(401)

            const buyersAfter = await helper.buyersInDb()
            expect(buyersAfter.length).toBe(helper.testBuyers.length)
        })

        it('buyer can be deleted', async () => {
            const buyersBefore = await helper.buyersInDb()
            const buyerToDelete = buyersBefore[0]
            const id = buyerToDelete.id

            await api
                .delete(`/api/buyers/${buyerToDelete.id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)
            
            const buyersAfter = await helper.buyersInDb()
            expect(buyersAfter.length).toBe(helper.testBuyers.length -1)

            const ids = buyersAfter.map(b => b.id)
            expect(ids).not.toContain(id)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})