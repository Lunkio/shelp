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
    cy.wait(5000)
    cy.get('[data-testid=products]').click()
    cy.get('[data-testid=shop-product-edit]').first().click()
    cy.get('[data-testid=name]').first().clear({ force: true }).type('Edited Name')
    cy.get('[data-testid=originalPrice]').first().clear({ force: true }).type(30)
    cy.contains('0 %').first().click()
    cy.get('[data-testid=product-1Day]').first().click()
    cy.get('[data-testid=shop-product-edit-product]').first().click()
})

describe('customer experience', function() {

    it('cart shows empty no when products in cart', function() {
        cy.visit('http://localhost:3001/cart')
        cy.contains('Cart is empty')
        cy.get('[data-testid=cart-empty-back-to-products]').click()
    })

    it('products can be added to cart', function() {
        cy.get('[data-testid=cartbutton]').first().click()
        cy.contains('Add to Cart').click()
        cy.contains('In cart')
        cy.contains('Cart (2)').click()
        cy.contains('Shopping Cart')
        cy.contains('Test Product')
    })

    it('checkout show paypal only when shipping details are set', function() {
        cy.get('[data-testid=cart-checkout-button]').click()
        cy.contains('Shipping address')
        cy.get('#checkBtn').click()
        cy.get('[data-testid=paypal-button]').should('be.hidden')

        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Customer')
        cy.get('#email').type('customer@test.com')
        cy.get('#street').type('Street')
        cy.get('#city').type('Helsinki')
        cy.get('#zip').type('00200')
        cy.get('#phone').type('1235432')
        cy.get('#checkBtn').click()
        cy.get('[data-testid=paypal-button]').should('be.visible')
        cy.get('[data-testid=back-to-cart]').click()
    })

    it('products can be removed from cart', function() {
        cy.get('[data-testid=remove-from-cart]').first().click()
        cy.contains('Edited Name').should('not.exist')
        cy.get('[data-testid=empty-cart]').click()
        cy.contains('Cart is empty')
    })
})

after(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
})