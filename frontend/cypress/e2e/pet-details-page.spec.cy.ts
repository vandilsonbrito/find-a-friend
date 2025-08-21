describe('Pet Details', () => {
  it('should display pet details correctly', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/pets/1`, {
      statusCode: 200,
      body: {
        pet: {
          id: 1,
          name: 'Maya',
          description: 'Gata exótica de origem árabe, elegante e independente.',
          age: 'adult',
          size: 'medium',
          energy_level: 'medium',
          independence_level: 'high',
          environment: 'medium',
          sex: 'female',
          type: 'cat',
          breed: 'Mau Árabe',
          city: 'sao paulo',
          state: 'SP',
          is_adopted: false,
          photos: ['/cats/mau-arabe.jpg'],
          created_at: '2025-06-25T14:59:22.374Z',
          org_id: 'org-456',
        },
      },
    }).as('getPet');

    cy.intercept('GET', `${Cypress.env('apiUrl')}/orgs/org-456`, {
      statusCode: 200,
      body: {
        org: {
          id: 'org-456',
          name: 'Tita Org',
          description: 'Org founded By Me',
          whatsapp: '1111111111',
          address: 'Rua Burn, 70, Centro',
          city: 'sao paulo',
          state: 'SP',
          cep: '123456789',
          created_at: '2025-06-14T21:10:38.508Z',
        },
      },
    }).as('getOrg');

    cy.visit('/pets/1');
    cy.wait(['@getPet', '@getOrg'], { timeout: 10000 });

    cy.get('img').should('be.visible');
    cy.contains('Maya').should('be.visible');
    cy.contains('Sobre').should('be.visible');
    cy.contains(
      'Gata exótica de origem árabe, elegante e independente.'
    ).should('be.visible');
    cy.contains('Adulto').should('be.visible');

    cy.contains('Tita Org', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');
    cy.contains('Sao Paulo, SP').scrollIntoView().should('be.visible');
    cy.get('button')
      .contains('Entrar em contato')
      .scrollIntoView()
      .should('be.visible');
  });

  it('should open WhatsApp link in a new tab when clicking contact button', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/pets/1`, {
      statusCode: 200,
      body: {
        pet: {
          id: 1,
          name: 'Maya',
          description: 'Gata exótica de origem árabe, elegante e independente.',
          age: 'adult',
          size: 'medium',
          energy_level: 'medium',
          independence_level: 'high',
          environment: 'medium',
          sex: 'female',
          type: 'cat',
          breed: 'Mau Árabe',
          city: 'sao paulo',
          state: 'SP',
          is_adopted: false,
          photos: ['/cats/mau-arabe.jpg'],
          created_at: '2025-06-25T14:59:22.374Z',
          org_id: 'org-456',
        },
      },
    }).as('getPet');

    cy.intercept('GET', `${Cypress.env('apiUrl')}/orgs/org-456`, {
      statusCode: 200,
      body: {
        org: {
          id: 'org-456',
          name: 'Tita Org',
          description: 'Org founded By Me',
          whatsapp: '1111111111',
          address: 'Rua Burn, 70, Centro',
          city: 'sao paulo',
          state: 'SP',
          cep: '123456789',
          created_at: '2025-06-14T21:10:38.508Z',
        },
      },
    }).as('getOrg');

    cy.visit('/pets/1', {
      timeout: 10000,
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen');
      },
    });

    cy.wait(['@getPet', '@getOrg'], { timeout: 10000 });

    cy.contains('Entrar em contato')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get('@windowOpen').should('have.been.calledOnce');
  });
});