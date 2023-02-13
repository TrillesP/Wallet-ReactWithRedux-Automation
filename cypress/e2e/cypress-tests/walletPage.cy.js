/// <reference types="cypress" />

describe('teste Wallet page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/wallet')
    })
  
    it('verifica se o valor da carteira começa com 0 e a existência dos inputs e do botão de adicionar ainda disabled', () => {
        cy.contains('0.00').should('exist')
        cy.get('[data-testid="value-input"]').should('exist')
        cy.get('[data-testid="description-input"]').should('exist')
        cy.get('[data-testid="currency-input"]').should('exist').and('have.value', 'USD')
        cy.get('[data-testid="method-input"]').should('exist').and('have.value', 'PIX')
        cy.get('[data-testid="tag-input"]').should('exist').and('have.value', 'Lazer')
        cy.get('[data-testid="add-btn"]').should('be.disabled')
    })
  
    it('escreve value e verifica se botão fica enabled', () => {
        cy.get('[data-testid="value-input"]').type('10')
        cy.get('[data-testid="add-btn"]').should('not.be.disabled')
    })

    it('verifica se, ao adicionar uma despesa, os valores digitados voltam aos originais e o botão volta a ficar disabled', () => {
        cy.get('[data-testid="value-input"]').type('10')
        cy.get('[data-testid="description-input"]').type('abacaxi')
        cy.get('[data-testid="currency-input"]').select('CAD')
        cy.get('[data-testid="method-input"]').select('Dinheiro')
        cy.get('[data-testid="tag-input"]').select('Alimentação')
        cy.get('[data-testid="add-btn"]').click()

        cy.get('[data-testid="value-input"]').should('have.value', '')
        cy.get('[data-testid="description-input"]').should('have.value', '')
        cy.get('[data-testid="currency-input"]').should('have.value', 'USD')
        cy.get('[data-testid="method-input"]').should('have.value', 'PIX')
        cy.get('[data-testid="tag-input"]').should('have.value', 'Lazer')
        cy.get('[data-testid="add-btn"]').should('be.disabled')
    })

    it('verifica infos mostradas corretamente na carteira após adicionar despesa, assim como botões de edit e excluir', () => {
        cy.get('[data-testid="value-input"]').type('10')
        cy.get('[data-testid="description-input"]').type('abacaxi')
        cy.get('[data-testid="currency-input"]').select('CAD')
        cy.get('[data-testid="method-input"]').select('Dinheiro')
        cy.get('[data-testid="tag-input"]').select('Alimentação')
        cy.get('[data-testid="value-input"]').type('{enter}')
    
        cy.get('tbody > :nth-child(2) > :nth-child(1)').should('not.have.text', '')
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'abacaxi')
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'Dinheiro')
        cy.get('tbody > :nth-child(2) > :nth-child(4)').should('have.text', 'Dólar Canadense/Real Brasileiro')
        cy.get('tbody > :nth-child(2) > :nth-child(5)').should('not.have.text', '')
        cy.get('tbody > :nth-child(2) > :nth-child(6)').should('have.text', 'Alimentação')
        cy.get('[data-testid="edit-btn"]').should('exist')
        cy.get('[data-testid="delete-btn"]').should('exist')
    })

    it('adiciona uma despesa e verifica se o valor fica igual no header de valor total e na carteira', () => {
        cy.get('[data-testid="value-input"]').type('10')
        cy.get('[data-testid="add-btn"]').click()

        cy.contains('0.00').should('not.exist')
        cy.get('tbody > :nth-child(2) > :nth-child(1)').then((valor) => {
            const valorTxt = valor.text()
            cy.get('[data-testid="total-header"]').should('have.text', valorTxt)
        })
    })

    it('verifica se ao adicionar e depois deletar todos os itens da carteira o valor volta a zero', () => {
        cy.get('[data-testid="value-input"]').type('10')
        cy.get('[data-testid="add-btn"]').click()

        cy.get('[data-testid="value-input"]').type('20')
        cy.get('[data-testid="add-btn"]').click()

        cy.get('[data-testid="delete-btn"]').should('have.length', 2)
        cy.get(':nth-child(2) > :nth-child(8) > [data-testid="delete-btn"]').click()
        cy.get('[data-testid="delete-btn"]').click()
        cy.get('[data-testid="delete-btn"]').should('not.exist')

        cy.contains('0.00').should('exist')
    })

    it('testa botão de Edit, suas mudanças de valores e se os valores editados na carteira se mantém após Salvar', () => {
        cy.get('[data-testid="value-input"]').type('10')
        cy.get('[data-testid="description-input"]').type('abacaxi')
        cy.get('[data-testid="currency-input"]').select('CAD')
        cy.get('[data-testid="method-input"]').select('Dinheiro')
        cy.get('[data-testid="tag-input"]').select('Alimentação')
        cy.get('[data-testid="value-input"]').type('{enter}')

        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'abacaxi')
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('not.have.attr', 'contenteditable')
        cy.get('[data-testid="edit-btn"]').should('have.text', 'Edit')
        cy.get('[data-testid="edit-btn"]').click()
        cy.get('[data-testid="edit-btn"]').should('have.text', 'Salvar')
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.attr', 'contenteditable')
        cy.get('tbody > :nth-child(2) > :nth-child(2)').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2)').clear()
        cy.get('tbody > :nth-child(2) > :nth-child(2)').type('{backspace}abacate')
        cy.get('[data-testid="edit-btn"]').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('not.have.attr', 'contenteditable')
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'abacate')
    })

  })
  