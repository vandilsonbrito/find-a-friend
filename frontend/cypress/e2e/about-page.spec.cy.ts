describe('About', () => {
    beforeEach(() => {
        cy.visit('/about')
    })
    
    it('should render the about page correctly', () => {
        cy.get('h1').should('have.text', 'Sobre a FindAFriend')
        cy.contains('Nossa História').should('be.visible')
        cy.contains('Nossos Valores').should('be.visible')
        cy.contains('Nossa Equipe').should('be.visible')
    })
})