/// <reference types="cypress" />

describe('teste Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('verifica se o botão de login começa disabled e existência de inputs de login e senha', () => {
    cy.get('[data-testid="login-btn"]').should('be.disabled')
    cy.get('[data-testid="email-input"]').should('exist')
    cy.get('[data-testid="password-input"]').should('exist')
  })

  it('escreve login, password e efetua login, verificando se botão fica enabled e se a próxima página carrega corretamente', () => {
    cy.get('[data-testid="email-input"]').type('tril@gmail.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-btn"]').should('not.be.disabled')
    cy.contains('Login').click()

    cy.contains('Controle de gastos de:').should('exist')
    cy.contains('tril@gmail.com').should('exist')
  })
})
