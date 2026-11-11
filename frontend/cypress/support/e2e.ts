// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// On mount, AuthProvider calls PATCH /token/refresh to restore the session.
// Stub it as "not logged in" so tests never depend on a real backend.
// Specs can override this with their own intercept.
beforeEach(() => {
  cy.intercept('PATCH', '**/token/refresh', {
    statusCode: 401,
    body: { message: 'Refresh token missing.' },
  })
})