describe('Sign in', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/me`, (req) => {
      const auth = req.headers['authorization']
      console.log('Auth Header:', auth)

      if (auth === 'Bearer fake-valid-token-123') {
        req.reply({
          statusCode: 200,
          body: {
            org: {
              id: 'org-123',
              name: 'Test Org',
              description: 'This is a test organization.',
              email: 'user@example.com',
              whatsapp: '11999999999',
              address: 'Av. Paulista, 123',
              city: 'Sao Paulo',
              state: 'SP',
              cep: '12345-678',
              createdAt: new Date().toISOString(),
            },
          },
        })
      } else {
        req.reply({
          statusCode: 401,
          body: { error: 'Unauthorized' },
        })
      }
    })

    cy.intercept('POST', `${Cypress.env('apiUrl')}/sessions`, (req) => {
      const { email, password } = req.body

      if (email === 'user@example.com' && password === '123456') {
        req.reply({
          statusCode: 200,
          body: {
            message: 'Authentication successful.',
            accessToken: 'fake-valid-token-123',
          },
        })
      } else {
        req.reply({
          statusCode: 401,
          body: {
            error: 'Unauthorized',
            message: 'Invalid credentials.',
          },
        })
      }
    })

    cy.visit('/signin')
  })

  it('Displays form elements correctly', () => {
    cy.contains('Entrar como Organização').should('be.visible')
    cy.contains('E-mail').should('be.visible')
    cy.contains('Senha').should('be.visible')
    cy.get('button').contains('Entrar').should('have.text', 'Entrar')
    cy.contains('Ainda não tem conta?').should('be.visible')
    cy.get('a').contains('Cadastre-se').should('be.visible')
  })

  it('Shows error toast for invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('wrong@example.com')
    cy.get('[data-testid="password-input"]').type('654321')
    cy.get('button').contains('Entrar').click()

    checkToast('Email ou senha inválidos.')
  })

  it('Logs in successfully with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('button').contains('Entrar').click()

    checkToast('Login realizado com sucesso!')
  })
})

function checkToast(expectedMessage: string | RegExp) {
  cy.get('[data-sonner-toast]', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', expectedMessage)
}
