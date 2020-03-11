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
        cy.get('#price').clear().type('20')
        cy.contains('50 %').click()
        const fileName = 'product-img.jpg'
        cy.fixture(fileName).then(fileContent => {
            cy.get('[type="file"]').upload({ fileContent, fileName, mimeType: 'image/jpeg' })
        })
        cy.get('#amount').clear().type(2)
        cy.get('[data-testid=tomorrow]').click()
        cy.get('[data-testid=upload]').click()
        cy.contains('Please wait')
        cy.wait(5000)
    })

    it('two products added', function() {
        cy.get('[data-testid=products]').click()
        cy.contains('Test Product').first()
        cy.contains('10 €')
        cy.contains('-50%')
    })

    it('product can be modified', function() {
        cy.get('[data-testid=shop-product-edit]').first().click()
        cy.get('[data-testid=name]').first().clear({ force: true }).type('Edited Name')
        cy.get('[data-testid=originalPrice]').first().clear({ force: true }).type(30)
        cy.contains('0 %').first().click()
        cy.get('[data-testid=product-1Day]').first().click()
        cy.get('[data-testid=shop-product-edit-product]').first().click()
        cy.contains('Edited Name')
        cy.contains('30 €')
        cy.contains('-0%')
    })

    it('product can be deleted', function() {
        cy.get('[data-testid=shop-product-remove]').first().click()
        cy.contains('Edited Name').should('not.exist')
        cy.contains('Test Product')
    })
})

after(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
})