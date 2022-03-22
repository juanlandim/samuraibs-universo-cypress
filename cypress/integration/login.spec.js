/// <reference types="cypress"/>
import loginpage from '../support/pages/login'
import dashpage from '../support/pages/dash'

describe('Login', function () {

    context('Quando o usuário é muito bom', function () {
        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', function () {
            loginpage.go()
            loginpage.form(user)
            loginpage.submit()

            dashpage.header.userLoggedIn(user.name)
        })
    })

    context('Quando o usuário é bom mas a senha está incorreta', function(){

        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }
        before(function(){
            cy.postUser(user).then(function(){
                user.password = 'abc123'
            })         
        })

        it('Deve notificar erro de credenciais', function(){
            
            loginpage.go()
            loginpage.form(user)
            loginpage.submit()
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginpage.toast.shouldHaveText(message)
        })
    
        
    })

    context('Quando o formato do email é inválido', function(){
        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'papito@',
            '111',
            '&*^&^&*',
            'xpto123'
        ]

        before(function(){
            loginpage.go()
        })

        emails.forEach(function(email){
            it('Não deve logar com o email: ' +email, function(){
                const user = {email: email, password: 'pwd123'}             
                loginpage.form(user)
                loginpage.submit()
                loginpage.alert.haveText('Informe um email válido')
            })
        })
    })

    context('Quando não preencho nehum dos campos', function(){
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            loginpage.go()
            loginpage.submit()
        })

        alertMessages.forEach(function(alert){
            it('Deve exibir '+ alert.toLocaleLowerCase(), function(){
                loginpage.alert.haveText(alert)
            })
        })    
    })
})