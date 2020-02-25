const Product = require('../models/productModel')
const Buyer = require('../models/buyerModel')
const Shop = require('../models/shopModel')

const testProducts = [
    {
        price: 5,
        description: "Lasagne",
        availability: true
    },
    {
        price: 10,
        description: "Maksalaatikko",
        availability: true
    },
    {
        price: 15,
        description: "Makaronilaatikko",
        availability: true
    }
]

const testImages = [
    {
        filename: '123456789.jpg',
        location: 'api/products/image/123456789.jpg',
        contentType: 'image/jpeg'
    },
    {
        filename: '987654321.jpg',
        location: 'api/products/image/987654321.jpg',
        contentType: 'image/jpeg'
    },
    {
        filename: '192837465.jpg',
        location: 'api/products/image/192837465.jpg',
        contentType: 'image/jpeg'
    }
]

const testBuyers = [
    {
        firstName: 'Eka',
        lastName: 'Testaaja',
        email: 'tester@test.fi',
        address: 'Street 1',
        city: 'Helsinki',
        zip: '00100',
        phone: '0501234567',
        products: [],
        paymentID: '1q2w3e4r5t',
        payerID: '6y7u8i9o0p'
    },
    {
        firstName: 'Toka',
        lastName: 'Testeri',
        email: 'tester@test.com',
        address: 'Street 2',
        city: 'Turku',
        zip: '20100',
        phone: '0507654321',
        products: [],
        paymentID: 'q1w2e3r4t5',
        payerID: 'y6u7i8o9p0'
    }
]

const testShops = [
    {
        name: 'K-Kauppa',
        email: 'k@kauppa.fi',
        password: 'secret1',
        address: 'Kauppakatu 1',
        zip: '00100',
        city: 'Helsinki',
        phone: '0401928374',
        website: 'www.fi'
    },
    {
        name: 'S-Kauppa',
        email: 's@kauppa.fi',
        password: 'secret2',
        address: 'Kauppiaskatu 1',
        zip: '20100',
        city: 'Turku',
        phone: '0406574929',
        website: 'www.com'
    },
    {
        name: 'Lidl',
        email: 'lidl@kauppa.fi',
        password: 'secret3',
        address: 'Lidlkatu 1',
        zip: '20200',
        city: 'Turku',
        phone: '0406375689',
        website: 'www.de'
    }
]

const productsInDb = async () => {
    const products = await Product.find({}).populate('img').populate('shop')
    return products.map(p => p.toJSON())
}

const buyersInDb = async () => {
    const buyers = await Buyer.find({})
    return buyers.map(b => b.toJSON())
}

const shopsInDb = async () => {
    const shops = await Shop.find({})
    return shops.map(s => s.toJSON())
}

module.exports = {
    testProducts,
    testImages,
    testBuyers,
    testShops,
    productsInDb,
    buyersInDb,
    shopsInDb
}