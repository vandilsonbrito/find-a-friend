// When the access token expires, the app must refresh it and retry the failed
// request with the NEW token. The fake API rejects token A and accepts token B,
// which is what /token/refresh returns.

const pets = [
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
]

describe('Access token refresh', () => {
  beforeEach(() => {
    // Refresh is called twice: on mount (session restore, must fail since nobody
    // is logged in yet) and after the 401 (returns token B).
    // This intercept overrides the one in cypress/support/e2e.ts.
    let refreshCalls = 0
    cy.intercept('PATCH', `${Cypress.env('apiUrl')}/token/refresh`, (req) => {
      refreshCalls += 1
      if (refreshCalls === 1) {
        req.reply({ statusCode: 401, body: { message: 'Refresh token missing.' } })
      } else {
        req.reply({ statusCode: 200, body: { accessToken: 'token-B' } })
      }
    }).as('refresh')

    cy.intercept('POST', `${Cypress.env('apiUrl')}/sessions`, {
      statusCode: 200,
      body: { accessToken: 'token-A' },
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

    // The fake API decides by the Authorization header:
    // token A = expired (401), token B = refreshed (200).
    cy.intercept('GET', `${Cypress.env('apiUrl')}/orgs/org-123/pets`, (req) => {
      if (req.headers.authorization === 'Bearer token-B') {
        req.reply({ statusCode: 200, body: { pets } })
      } else {
        req.reply({ statusCode: 401, body: { message: 'Invalid or expired token.' } })
      }
    }).as('getPets')
  })

  it('should retry the failed request with the refreshed token', () => {
    cy.visit('/signin')

    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('button').contains('Entrar').click()

    cy.wait('@postSessions')
    cy.wait('@getMe')

    cy.wait('@getPets')
      .its('request.headers.authorization')
      .should('eq', 'Bearer token-A')

    cy.wait('@refresh')
    cy.wait('@refresh').its('response.body.accessToken').should('eq', 'token-B')

    cy.wait('@getPets')
      .its('request.headers.authorization')
      .should('eq', 'Bearer token-B')

    cy.contains('Maya').should('be.visible')
  })
})
