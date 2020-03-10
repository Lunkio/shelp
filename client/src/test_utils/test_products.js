export const product = {
    "id": 1,
    "description": "Kasvismakaronilaatikko 400g",
    "price": 10,
    "discount": 50,
    "originalPrice": 20,
    "date": "2020-01-01",
    "availability": true,
    "expired": false,
    "img": {
        "filename": "12345.jpg",
        "location": "api/images/12345.jpg",
        "contentType": "image/jpeg",
        "id": 1
    },
    "shop": {
        "products": [1],
        "name": "Single Test Shop",
        "email": "singletest@shop.com",
        "address": "Street",
        "zip": "00100",
        "city": "Helsinki",
        "phone": "0505647382",
        "id": 1000
    }
}

export const products = [
    {
        "id": 2,
        "description": "Lihamakaronilaatikko 400g",
        "price": 10,
        "discount": 50,
        "originalPrice": 20,
        "date": "2020-01-01",
        "availability": true,
        "expired": false,
        "img": {
            "filename": "12345.jpg",
            "location": "api/images/12345.jpg",
            "contentType": "image/jpeg",
            "id": 1
        },
        "shop": {
            "products": [2],
            "name": "Test Shop",
            "email": "test@shop.com",
            "address": "Street 1",
            "zip": "00100",
            "city": "Helsinki",
            "phone": "05012345678",
            "id": 1
        }
    },
    {
        "id": 3,
        "description": "Maksalaatikko",
        "price": 5,
        "discount": 50,
        "originalPrice": 10,
        "date": "2020-02-02",
        "availability": true,
        "expired": false,
        "img": {
            "filename": "123456.jpg",
            "location": "api/images/123456.jpg",
            "contentType": "image/jpeg",
            "id": 2
        },
        "shop": {
            "products": [3],
            "name": "Test Shop2",
            "email": "test@shop.com",
            "address": "Street 2",
            "zip": "00200",
            "city": "Helsinki",
            "phone": "05087654321",
            "id": 2
        }
    }
]