const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Shop = require('../models/shopModel')
const supertest = require('supertest')
const api = supertest(app)

describe('login-api', () => {
    beforeEach(async () => {
        await Shop.deleteMany({})
        await api.post('/api/shops').send(helper.testShops[0])
    })

    describe('shop logging in', () => {
        it('login not possible without correct name and psw', async () => {
            const credentials = {
                name: 'Wrong Shop',
                password: 'wrong'
            }

            await api
                .post('/api/login')
                .send(credentials)
                .expect(401)
        })

        it('login possible with correct name and psw', async () => {
            const credentials = {
                name: 'K-Kauppa',
                password: 'secret1'
            }

            await api
                .post('/api/login')
                .send(credentials)
                .expect(200)
        })
    })
})

afterAll(async () => {
    await mongoose.disconnect()
})