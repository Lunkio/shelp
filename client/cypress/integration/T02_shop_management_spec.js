before(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.visit('http://localhost:3001/register')
})

describe('shop managing', function() {
    
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
        cy.get('#shopName').clear()
        cy.get('#shopPassword').clear()
    })

    it('shop can be edited', function() {
        cy.get('#shopName').type('Test Shop')
        cy.get('#shopPassword').type('secret')
        cy.get('#loginBtn').click()
        cy.get('[data-testid=manage]').click()
        cy.get('[data-testid=manage-edit-shop]').click()
        cy.contains('Edit shop details')
        cy.get('#newName').clear().type('Edited Shop Name')
        cy.get('#editEmail').clear().type('edited@shop.com')
        cy.get('#editAddress').clear().type('Edit Street 1')
        cy.get('#editZip').clear().type('20000')
        cy.get('#editCity').clear().type('Turku')
        cy.get('#editPhone').clear().type('123456789')
        cy.get('[data-testid=manage-submit]').click()
        cy.contains('Shop details updated successfully!')
        cy.contains('Logged in as Edited Shop Name')
    })

    it('coordinates can be found if real address', function() {
        cy.get('[data-testid=manage-coordinates]').click()
        cy.get('#editLatitude').should('have.value', '')
        cy.get('#editLongitude').should('have.value', '')
        cy.contains('Couldn\'t get the coordinates')
        cy.get('#editAddress').clear().type('Hämeentie 62')
        cy.get('#editZip').clear().type('00500')
        cy.get('#editCity').clear().type('Helsinki')
        cy.get('[data-testid=manage-coordinates]').click()
        cy.get('#editLatitude').should('not.have.value', '')
        cy.get('#editLongitude').should('not.have.value', '')
        cy.contains('If the location is not correct on the map')
        cy.get('[data-testid=manage-clear-coordinates]').click()
        cy.get('[data-testid=manage-cancel]').click()
    })

    it('shop cannot be deleted with wrong password', function() {
        cy.get('[data-testid=manage-delete-shop]').click()
        cy.get('[data-testid=remove-yes]').click()
        cy.get('#shopRemovePassword').type('wrong')
        cy.get('[data-testid=remove]').click()
        cy.contains('Deletion was not successful, check your password and please try again')
        cy.get('[data-testid=remove-no]').click()
    })

    it('shop can be deleted with correct password', function() {
        cy.get('[data-testid=manage-delete-shop]').click()
        cy.get('[data-testid=remove-yes]').click()
        cy.get('#shopRemovePassword').clear().type('secret')
        cy.get('[data-testid=remove]').click()
        cy.contains('Login as Shelp Partner')
    })
})

after(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
})