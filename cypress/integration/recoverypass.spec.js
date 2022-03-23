/// <reference types="cypress"/>
import fpPage from '../support/pages/forgotpass'

describe('Resgate de senha', function () {
    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })
    context('Quando o usuário esquece a senha', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('Deve poder resgatar por email', function () {
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()
            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            fpPage.toast.shouldHaveText(message)
        })
    })
})