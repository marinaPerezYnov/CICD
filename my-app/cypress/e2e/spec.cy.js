describe('Home page spec', () => {
 it('deployed react app to localhost', () => {
    cy.visit('http://localhost:3000/CICD/listUsers')
    cy.contains('1 user(s) already registered')
 })
})