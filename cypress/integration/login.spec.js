/// <reference types="cypress"/>
import signupPage from '../support/pages/signup'
import loginPage from '../support/pages/login'

describe('Login', function () {

    context('Quando o login é com sucesso', function () {

        const user = {
            name: 'Juan Landim',
            email: 'juanlandim@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        it('Deve fazer login com sucesso', function () {
            loginPage.login.userLogin(user)
            loginPage.validLogin()
        })
    })

    context('Quando a senha é incorreta', function () {
        const user = {
            name: 'Juan Landim',
            email: 'juanlandim@samuraibs.com',
            password: 'pwd123aa2'
        }

        it('Deve retorna mensagem de erro', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.singIn()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('Quando o email tem formato inválido', function () {
        const user = {
            name: 'Juan Landim',
            email: 'juanlandim.samuraibs.com',
            password: 'pwd123'
        }

        it('Deve retorna mensagem para informar um email valido', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.singIn()
            loginPage.alertHaveText('Informe um email válido')
        })
    })

    context('Quando não preencho nehum dos campos', function () {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.go()
            loginPage.singIn()
        })

        alertMessages.forEach(function (alert) {
            it('Deve exibir ' + alert.toLocaleLowerCase(), function () {
                signupPage.alertHaveText(alert)
            })
        })
    })
})

