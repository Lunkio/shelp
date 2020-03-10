before(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.visit('http://localhost:3001/register')
})

describe('shop registration', function() {
    
    it('shop needs address', function() {
        cy.get('#shopZip').type('00100')
        cy.get('#shopCity').type('Helsinki')
        cy.get('[data-testid=first-continue]').click()
        cy.contains('All the fields must be filled')
        cy.get('#shopAddress').type('Street 1')
        cy.get('[data-testid=first-continue]').click()
    })

    it('shop needs a name', function() {
        cy.get('[data-testid=second-continue]').click()
        cy.contains('Please type your shop name')
        cy.get('#shopName').type('Test Shop')
    })

    it('passwords should match', function() {
        cy.get('#shopPsw').type('secret')
        cy.get('#shopPswAgain').type('password')
        cy.get('[data-testid=second-continue]').click()
        cy.contains('Please check that both passwords are identical and not empty')
        cy.get('#shopPswAgain').clear().type('secret')
        cy.get('[data-testid=second-continue]').click()
    })

    it('shops needs an email-address', function() {
        cy.get('#shopPhone').type('05011234567')
        cy.get('[data-testid=third-continue]').click()
        cy.contains('Please provide at least shop\'s phone and email information')
        cy.get('#shopEmail').type('shop@shop.com')
        cy.get('[data-testid=third-continue]').click()
        cy.contains('Submit')
    })
})