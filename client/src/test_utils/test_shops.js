import { products } from './test_products'

export const shops = [
    {
        "products": [products[0].id],
        "name": "Test Shop",
        "email": "test@shop.com",
        "address": "Street 1",
        "zip": "00100",
        "city": "Helsinki",
        "phone": "05012345678",
        "id": 1
    },
    {
        "products": [products[1].id],
        "name": "Test Shop2",
        "email": "test@shop.com",
        "address": "Street 2",
        "zip": "00200",
        "city": "Helsinki",
        "phone": "05087654321",
        "id": 2
    }
]

export const shop = {
    "name": "K-Kauppa",
    "token": "qwerty12345"
}