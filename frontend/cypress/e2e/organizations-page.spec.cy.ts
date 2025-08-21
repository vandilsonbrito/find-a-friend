describe('Organizations', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/orgs`, {
      statusCode: 200,
      body: {
        orgsList: [
          {
            id: 'org-123',
            name: 'Test Org',
            description: 'This is a test organization.',
            email: 'user@example.com',
            whatsapp: '11999999999',
            address: 'Av Paulista, 123',
            city: 'Sao Paulo',
            state: 'SP',
            cep: '12345-678',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'org-456',
            name: 'Test Org 2',
            description: 'This is a test organization.',
            email: 'user@example.com',
            whatsapp: '11999999999',
            address: 'Av Paulista, 123',
            city: 'Sao Paulo',
            state: 'SP',
            cep: '12345-678',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'org-789',
            name: 'Test Org 3',
            description: 'This is a test organization.',
            email: 'user@example.com',
            whatsapp: '11999999999',
            address: 'Av Paulista, 123',
            city: 'Sao Paulo',
            state: 'SP',
            cep: '12345-678',
            createdAt: new Date().toISOString(),
          },
        ],
      },
    })

    cy.visit('/orgs')
  })

  it('should render the organizations page correctly', () => {
    cy.get('h1').should('have.text', 'Organizações Parceiras')
    cy.contains('Algumas das Nossas Organizações').should('be.visible')

    cy.contains('É uma organização?').should('be.visible')
    cy.get('a').contains('Cadastrar Organização').should('be.visible')
  })

  it('should display a list of organizations', () => {
    cy.get('[data-testid="org-card"]')
      .should('have.length', 3)
      .each(($card) => {
        cy.wrap($card).should('be.visible')
        cy.wrap($card)
          .find('button')
          .contains('Entrar em Contato')
          .should('be.visible')
      })
  })

  it('should display error message when the API fails', () => {
    cy.intercept('GET', '/orgs', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getOrgsError')

    cy.wait('@getOrgsError', { timeout: 10000 })

    cy.get('[data-testid="error-message"]', { timeout: 20000 }).should(
      'be.visible',
    )
  })
})
