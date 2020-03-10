before(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.visit('http://localhost:3001/register')
    cy.get('#shopAddress').type('Street 1')
    cy.get('#shopZip').type('00100')
    cy.get('#shopCity').type('Helsinki')
    cy.get('[data-testid=first-continue]').click()

    cy.get('#shopName').type('Test Shop')
    cy.get('#shopPsw').type('secret')
    cy.get('#shopPswAgain').type('secret')
    cy.get('[data-testid=second-continue]').click()

    cy.get('#shopEmail').type('shop@shop.com')
    cy.get('#shopPhone').type('05011234567')
    cy.get('[data-testid=third-continue]').click()
    cy.get('#submitBtn').click()

    cy.contains('Shop Login').click()
    cy.get('#shopName').type('Test Shop')
    cy.get('#shopPassword').type('secret')
    cy.get('#loginBtn').click()
})

describe('product control', function() {

    it('new product can be added', function() {
        cy.get('[data-testid=add]').click()
        cy.get('#desc').type('Test Product')
        cy.get('#price').type('20')
        cy.contains('50 %').click()
        const fileName = 'product-img.jpg'
        cy.fixture(fileName).then(fileContent => {
            cy.get('[type="file"]').upload({ fileContent, fileName, mimeType: 'image/jpeg' })
        })
        cy.get('#amount').clear().type(2)
        cy.get('[data-testid=tomorrow]').click()
        cy.get('[data-testid=upload]').click()
        cy.contains('Please wait')
    })
})

// after(function() {
//     cy.request('POST', 'http://localhost:3001/api/test/reset')
// })