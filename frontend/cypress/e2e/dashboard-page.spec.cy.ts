describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/sessions`, (req) => {
      const { email, password } = req.body
      if (email === 'user@example.com' && password === '123456') {
        req.reply({
          statusCode: 200,
          body: {
            accessToken: 'fake-valid-token-123',
          },
        })
      } else {
        req.reply({
          statusCode: 401,
          body: { message: 'Invalid credentials' },
        })
      }
    }).as('postSessions')

    cy.intercept('GET', `${Cypress.env('apiUrl')}/me`, {
      statusCode: 200,
      body: {
        org: {
          id: 'org-123',
          name: 'Test Org',
          email: 'user@example.com',
          whatsapp: '11999999999',
          address: 'Av. Paulista, 123',
          city: 'Sao Paulo',
          state: 'SP',
          cep: '12345-678',
          createdAt: new Date().toISOString(),
        },
      },
    }).as('getMe')

    cy.intercept('GET', `${Cypress.env('apiUrl')}/orgs/org-123/pets`, {
      statusCode: 200,
      body: {
        pets: [
          {
            id: 1,
            name: 'Maya',
            age: 'adult',
            description: 'Linda gata.',
            is_adopted: false,
            city: 'São Paulo',
            state: 'SP',
            photos: ['/cats/maya.jpg'],
            created_at: new Date().toISOString(),
            org_id: 'org-123',
            breed: 'Siamês',
            type: 'cat',
            energy_level: 'high',
            size: 'small',
            independence_level: 'medium',
            environment: 'medium',
            sex: 'female',
          },
          {
            id: 2,
            name: 'Lino',
            age: 'adult',
            description: 'Linda Dog.',
            is_adopted: false,
            city: 'São Paulo',
            state: 'SP',
            photos: ['/dog/border-collie.png'],
            created_at: new Date().toISOString(),
            org_id: 'org-123',
            breed: 'Border Collie',
            type: 'dog',
            energy_level: 'high',
            size: 'small',
            independence_level: 'medium',
            environment: 'medium',
            sex: 'male',
          },
        ],
      },
    }).as('getPets')

    cy.intercept('DELETE', '**/pets/1', {
      statusCode: 204,
    }).as('deletePet')

    cy.visit('/signin')

    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('button').contains('Entrar').click()

    cy.wait('@postSessions')
    cy.wait('@getMe')
    cy.wait('@getPets')
  })

  it('should display pets from the organization', () => {
    cy.contains('Maya').should('be.visible')
    cy.contains('Lino').should('be.visible')
    cy.contains('Disponível').should('be.visible')
  })

  it('should be able to edit a pet', () => {
    cy.intercept('PATCH', `${Cypress.env('apiUrl')}/pets/1`, {
      statusCode: 200, 
      body: {
        id: 1,
        name: 'Maya Editada', 
        age: 'old', 
        description: 'Linda gata, agora com nova descrição.', 
        is_adopted: false,
        city: 'São Paulo',
        state: 'SP',
        photos: ['/cats/maya.jpg'],
        created_at: new Date().toISOString(),
        org_id: 'org-123',
        breed: 'Siamês',
        type: 'cat',
        energy_level: 'high',
        size: 'small',
        independence_level: 'medium',
        environment: 'medium',
        sex: 'female',
      },
    }).as('patchPet')
  
    cy.intercept('GET', `${Cypress.env('apiUrl')}/orgs/org-123/pets`, {
      statusCode: 200,
      body: {
        pets: [
          {
            id: 1,
            name: 'Maya Editada',
            age: 'adult',
            description: 'Linda gata.',
            is_adopted: false,
            city: 'São Paulo',
            state: 'SP',
            photos: ['/cats/maya.jpg'],
            created_at: new Date().toISOString(),
            org_id: 'org-123',
            breed: 'Siamês',
            type: 'cat',
            energy_level: 'high',
            size: 'small',
            independence_level: 'medium',
            environment: 'medium',
            sex: 'female',
          },
          {
            id: 2,
            name: 'Lino',
            age: 'adult',
            description: 'Linda Dog.',
            is_adopted: false,
            city: 'São Paulo',
            state: 'SP',
            photos: ['/dog/border-collie.png'],
            created_at: new Date().toISOString(),
            org_id: 'org-123',
            breed: 'Border Collie',
            type: 'dog',
            energy_level: 'high',
            size: 'small',
            independence_level: 'medium',
            environment: 'medium',
            sex: 'male',
          },
        ],
      },
    }).as('getPetsAfterPatch')
  
    cy.get('[data-testid="edit-pet-1"]').click()
    cy.get('[data-testid="name-input"]').clear().type('Maya Editada')
    cy.get('button').contains('Salvar Edição').click()
  
    cy.wait('@patchPet')
    
    cy.wait('@getPetsAfterPatch')
  
    cy.contains('Maya Editada', { timeout: 10000 }).should('be.visible')
    cy.contains('Pet editado com sucesso!', { timeout: 10000 }).should('be.visible')
  })

  it('should be able to delete a pet', () => {
    cy.get('[data-testid="delete-pet-1"]').click()
    cy.contains('Pet excluído com sucesso!', { timeout: 10000 }).should(
      'be.visible',
    )
  })
})
