/// <reference types="cypress"/>
import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    context('Quando o usuário é novato', function () {
        const user = {
            name: 'Fernando Papito',
            email: 'papito@gmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuario', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o email já existe', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('Não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quado o email é incorreto', function(){
        const user = {
            name: 'João Lucas',
            email: 'joao.samuraibs.com',
            password: 'pwd123',
        }

        it('Deve exibir mensagem de alerta', function(){
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })

    })

    context('Quando a senha é muito curta', function(){

        const passwords = ['1','2a','ab3','abc4','ab#c5']

        const user ={
            name: 'Jason Friday',
            email: 'jason@gmail.com',
            password: '1'
        }

        beforeEach(function(){
            signupPage.go()
        })

        passwords.forEach(function(p){
            it('Não deve cadastrar com a senha: '+ p, function(){
                const user ={name: 'Jason Friday',email: 'jason@gmail.com',password: p}

                signupPage.form(user)
                signupPage.submit()
            })
        })
        
       afterEach(function(){
            signupPage.alertHaveText('Pelo menos 6 caracteres')
       })
    })

    context('Quando não preencho nehum dos campos', function(){
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('Deve exibir '+ alert.toLocaleLowerCase(), function(){
                signupPage.alertHaveText(alert)
            })
        })
    })
})

