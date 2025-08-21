/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('loginViaUI', () => {
    cy.intercept('POST', '**/sessions', (req) => {
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
          body: {
            message: 'Invalid credentials',
          },
        })
      }
    }).as('postSessions')
  
    cy.intercept('GET', '**/me', {
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
  
    cy.visit('/signin')
  
    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('button').contains('Entrar').click()
  
    cy.wait('@postSessions')
    cy.wait('@getMe')
  })