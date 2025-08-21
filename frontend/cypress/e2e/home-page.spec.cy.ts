describe('Home', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/pets`, {
      statusCode: 200,
      body: {
        current_page: 1,
        pets: [
          {
            id: 1,
            org_id: 'org-456',
            name: 'Apollo',
            description: 'Cão dócil e adora crianças.',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            independence_level: 'medium',
            environment: 'medium',
            breed: 'Bernedoodle',
            sex: 'male',
            type: 'dog',
            city: 'sao paulo',
            state: 'SP',
            photos: ['/dogs/bernedoodle.jpg'],
            is_adopted: false,
            created_at: new Date(),
          },
          {
            id: 2,
            org_id: 'org-678',
            name: 'Zé',
            description: 'Cão dócil e adora crianças.',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            independence_level: 'medium',
            environment: 'medium',
            breed: 'Bernedoodle',
            sex: 'male',
            type: 'dog',
            city: 'sao paulo',
            state: 'SP',
            photos: ['/dogs/mixed.jpg'],
            is_adopted: false,
            created_at: new Date(),
          },
          {
            id: 3,
            org_id: 'org-334',
            name: 'Irineu',
            description: 'Cão dócil e adora crianças.',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            independence_level: 'medium',
            environment: 'medium',
            breed: 'Bernedoodle',
            sex: 'male',
            type: 'dog',
            city: 'sao paulo',
            state: 'SP',
            photos: ['/cats/maine-coon.jpg'],
            is_adopted: false,
            created_at: new Date(),
          },
          {
            id: 4,
            org_id: 'org-432',
            name: 'Alexander',
            description: 'Cão dócil e adora crianças.',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            independence_level: 'medium',
            environment: 'medium',
            breed: 'Bernedoodle',
            sex: 'male',
            type: 'dog',
            city: 'sao paulo',
            state: 'SP',
            photos: ['/cats/maine-coon-3.jpg'],
            is_adopted: false,
            created_at: new Date(),
          },
          {
            id: 5,
            org_id: 'org-912',
            name: 'Irineu',
            description: 'Cão dócil e adora crianças.',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            independence_level: 'medium',
            environment: 'medium',
            breed: 'Bernedoodle',
            sex: 'male',
            type: 'dog',
            city: 'sao paulo',
            state: 'SP',
            photos: ['/cats/maine-coon.jpg'],
            is_adopted: false,
            created_at: new Date(),
          },
        ],
        total_pages: 1,
        total_pets: 5,
      },
    }).as('getPets')
    cy.visit('/')
    cy.wait('@getPets')
  })

  it('should be able to see the home page', () => {
    cy.contains('Encontre o amigo perfeito para sua família').should(
      'be.visible',
    )
    cy.get('a').contains('Buscar Pets').should('be.visible')
    cy.get('a').contains('Organizações').should('be.visible')
    cy.get('a').contains('Sobre').should('be.visible')
    cy.get('a').contains('Entrar').should('be.visible')

    cy.get('a').contains('Sou uma ORG').should('be.visible')

    cy.contains('Pets em destaque').should('be.visible')
  })

  it('should display exactly 4 pet cards in the featured pets section', () => {
    cy.get('[data-testid="pet-card"]')
      .should('have.length', 4)
      .each(($card) => {
        cy.wrap($card).should('be.visible')
        cy.wrap($card).find('img').should('be.visible')
      })
  })

  it('should display a link to view all pets in the featured pets section', () => {
    cy.get('a')
      .contains('Ver todos os pets')
      .should('be.visible')
      .and('have.attr', 'href', '/pets')
  })

  it('should display no pets found message when the API returns an empty list', () => {
    cy.intercept('GET', '/pets', {
      statusCode: 200,
      body: {
        current_page: 1,
        pets: [],
        total_pages: 0,
        total_pets: 0,
      },
    }).as('getPetsEmpty')

    cy.visit('/')
    cy.wait('@getPetsEmpty')

    cy.get('[data-testid="no-pets-message"]')
      .should('be.visible')
      .and('contain', 'Nenhum pet encontrado')

    cy.get('[data-testid="pet-card"]').should('not.exist')
  })

  it('should display an error message when the API fails', () => {
    cy.intercept('GET', '/pets', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getPetsError')

    cy.visit('/')
    cy.wait('@getPetsError')

    cy.get('[data-testid="error-message"]', { timeout: 20000 })
      .should('be.visible')
      .and('contain', 'Erro ao carregar os pets')

    cy.get('[data-testid="pet-card"]').should('not.exist')
  })
})
