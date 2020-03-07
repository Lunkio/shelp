describe('Shelp tests', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        cy.visit('http://localhost:3000')
    })

    it('displays messages that no products on sale when db empty', function() {
        cy.contains('There are currently no products on sale, please check again later')
        cy.contains('All Products').click()
        cy.contains('There are currently no products on sale, please check again later')
    })
})