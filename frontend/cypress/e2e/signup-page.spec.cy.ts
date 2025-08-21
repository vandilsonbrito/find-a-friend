describe('Sign up', () => {
  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/orgs`, (req) => {
      const {
        name,
        email,
        description,
        password,
        whatsapp,
        address,
        city,
        state,
        cep,
      } = req.body

      if (
        email === 'user@example.com' &&
        password === '123456' &&
        name &&
        description &&
        whatsapp &&
        address &&
        city &&
        state &&
        cep
      ) {
        req.reply({
          statusCode: 201,
          body: {
            org: {
              id: 'org-123',
              name,
              description,
              email,
              whatsapp,
              address,
              city,
              state,
              cep,
              createdAt: new Date().toISOString(),
            },
          },
        })
      }

      if (
        email === 'registeredemail@example.com'
      ) {
        req.reply({
          statusCode: 409,
          body: { message: 'Org already exists.' },
        })
      }

    })

    cy.visit('/signup')
  })

  it('Displays form elements correctly', () => {
    cy.contains('Cadastro de Organização').should('be.visible')
    cy.contains('Nome da Organização').should('be.visible')
    cy.contains('E-mail').should('be.visible')
    cy.contains('Senha').should('be.visible')
    cy.contains('Confirme a senha').should('be.visible')
    cy.get('button').contains('Continuar').should('have.text', 'Continuar')
    cy.contains('Já tem uma conta?').should('be.visible')
    cy.get('a').contains('Faça login').should('be.visible')
  })

  it('Shows error toast for missing fields on submit form step 1', () => {
    cy.get('[data-testid="name-input"]').type('ONG Amigos dos Animais')
    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')

    cy.get('button').contains('Continuar').click()

    checkToast('A confirmação da senha é obrigatória.')
  })

  it('Shows error toast for missing fields on submit form step 2', () => {
    cy.get('[data-testid="name-input"]').type('ONG Amigos dos Animais')
    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="confirm-password-input"]').type('123456')

    cy.get('button').contains('Continuar').click()

    cy.get('[data-testid="city-input"]').type('São Paulo')
    cy.get('[data-testid="state-input"]').type('SP')
    cy.get('[data-testid="postal-code-input"]').type('12345678')
    cy.get('[data-testid="whatsapp-input"]').type('11111111111')
    cy.get('[data-testid="about-input"]').type('ONG Amigos dos Animais')

    cy.get('button').contains('Finalizar cadastro').click()

    checkToast('O endereço é obrigatório.')
  })
  it('Shows error toast for invalid fields on submit form step 2', () => {
    cy.get('[data-testid="name-input"]').type('ONG Amigos dos Animais')
    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="confirm-password-input"]').type('123456')

    cy.get('button').contains('Continuar').click()

    cy.get('[data-testid="address-input"]').type('Rua Amigos dos Animais')
    cy.get('[data-testid="city-input"]').type('São Paulo')
    cy.get('[data-testid="state-input"]').type('SP')
    cy.get('[data-testid="postal-code-input"]').type('12345678')
    cy.get('[data-testid="whatsapp-input"]').type('1111111111')
    cy.get('[data-testid="about-input"]').type('ONG Amigos dos Animais')

    cy.get('button').contains('Finalizar cadastro').click()

    checkToast('Por favor, insira um WhatsApp válido (formato: (00) 00000-0000).')
  })

  it('Shows successful toast for creating an Org', () => {
    cy.get('[data-testid="name-input"]').type('ONG Amigos dos Animais')
    cy.get('[data-testid="email-input"]').type('user@example.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="confirm-password-input"]').type('123456')

    cy.get('button').contains('Continuar').click()

    cy.get('[data-testid="address-input"]').type('Rua Amigos dos Animais')
    cy.get('[data-testid="city-input"]').type('São Paulo')
    cy.get('[data-testid="state-input"]').type('SP')
    cy.get('[data-testid="postal-code-input"]').type('12345678')
    cy.get('[data-testid="whatsapp-input"]').type('11111111111')
    cy.get('[data-testid="about-input"]').type('ONG Amigos dos Animais')

    cy.get('button').contains('Finalizar cadastro').click()

    checkToast('Organização cadastrada com sucesso!')
  })
})


function checkToast(expectedMessage: string | RegExp) {
  cy.get('[data-sonner-toast]', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', expectedMessage)
}