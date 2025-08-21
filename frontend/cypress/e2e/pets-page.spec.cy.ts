describe('Pets Page', () => {
    it('should be able to see the pets page', () => {
      cy.intercept('GET', `${Cypress.env('apiUrl')}/pets?page=1`, {
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
          ],
          total_pages: 1,
          total_pets: 3,
        },
      }).as('getPets');
  
      cy.visit('/pets');
      cy.wait('@getPets', { timeout: 10000 });
  
      cy.contains('Encontre seu amigo').should('be.visible');
      cy.get('input[placeholder="Digite sua cidade"]').should('be.visible');
      cy.get('button').contains('Buscar').should('be.visible');
  
      cy.get('button').contains('Filtros').should('be.visible');
    });
  
    it('should display pet cards on the pets page', () => {
      cy.intercept('GET', `${Cypress.env('apiUrl')}/pets?page=1`, {
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
          ],
          total_pages: 1,
          total_pets: 3,
        },
      }).as('getPets');
  
      cy.visit('/pets');
      cy.wait('@getPets', { timeout: 10000 });
  
      cy.get('[data-testid="pet-card"]')
        .should('have.length', 3)
        .each(($card) => {
          cy.wrap($card).should('be.visible');
          cy.wrap($card).find('img').should('be.visible');
        });
    });
  
    it('should display no pets found message when the API returns an empty list', () => {
      cy.intercept('GET', '/pets?page=1', {
        statusCode: 200,
        body: {
          current_page: 1,
          pets: [],
          total_pages: 0,
          total_pets: 0,
        },
      }).as('getPetsEmpty');
  
      cy.visit('/pets');
      cy.wait('@getPetsEmpty', { timeout: 10000 });
  
      cy.get('[data-testid="no-pets-message"]')
        .should('be.visible')
        .and('contain', 'Nenhum pet encontrado.');
  
      cy.get('[data-testid="pet-card"]').should('not.exist');
    });
  
    it('should display an error message when the API fails', () => {
      cy.intercept('GET', `${Cypress.env('apiUrl')}/pets?page=1`, {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      }).as('getPetsError');
  
      cy.visit('/pets');
      cy.wait('@getPetsError', { timeout: 10000 });
  
      cy.get('[data-testid="error-message"]', { timeout: 20000 })
        .should('be.visible')
        .and('contain', 'Erro ao carregar os pets.');
  
      cy.get('[data-testid="pet-card"]').should('not.exist');
    });
  
    it('should display skeleton loading while fetching pets', () => {
      cy.intercept('GET', '/pets?page=1', (req) => {
        req.reply({
          delay: 1000,
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
              ],
            total_pages: 1,
            total_pets: 3,
          },
        });
      }).as('getPetsDelayed');
  
      cy.visit('/pets');
  
      cy.get('[data-testid="pet-card-loading"]', { timeout: 10000 })
        .should('have.length', 8) 
        .each(($skeleton) => {
          cy.wrap($skeleton).should('be.visible');
        });
  
      cy.wait('@getPetsDelayed', { timeout: 10000 });
  
      cy.get('[data-testid="pet-card"]').should('have.length', 3);
    });
  });