describe('test app links', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        cy.visit('http://localhost:3001')
    })

    it('links work as intended', function() {
        cy.contains('Shop Login').click()
        cy.contains('Login as Shelp Partner')

        cy.contains('All Products').click()
        cy.contains('Products on sale:')

        cy.contains('See Map').click()
        cy.contains('Discover offers')

        cy.contains('Cart').click()
        cy.contains('Cart is empty')

        cy.contains('Shelp').click()
        cy.contains('Welcome to Shelp!')

        cy.contains('Order').click()
        cy.contains('The more you order, the more you save.')

        cy.contains('Discover').click()
        cy.contains('Products on sale:')

        cy.contains('Shelp').click()
        cy.contains('Sell').click()
        cy.contains('Increase your revenue and reduce waste.')

        cy.contains('Sign up').click()
        cy.contains('Start selling with Shelp')

        cy.contains('Go back').click()
        cy.contains('Increase your revenue and reduce waste.')

        cy.contains('Login in').click()
        cy.contains('Login as Shelp Partner')
    })
})