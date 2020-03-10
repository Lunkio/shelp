before(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.visit('http://localhost:3001/register')
})

describe('adding a shop', function() {
    
    it('new shop can be added', function() {
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
    
        cy.contains('Test Shop is now registered!')
    })

    it('freshly registered shop can login', function() {
        cy.contains('Shop Login').click()
        cy.get('#shopName').type('Test Shop')
        cy.get('#shopPassword').type('secret')
        cy.get('#loginBtn').click()
        cy.contains('Logged in as Test Shop')
        cy.contains('Logout').click()
    })

    it('shop can\'t login without registering first', function() {
        cy.contains('Shop Login').click()
        cy.get('#shopName').type('Fake Shop')
        cy.get('#shopPassword').type('password')
        cy.get('#loginBtn').click()
        cy.contains('Wrong username or password')
    })
})

after(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
})