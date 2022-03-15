import { el } from './elements'

class Login {
    userLogin(user) {


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

        cy.visit('/')
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
        cy.contains(el.loginButton).click()
    }
}

export default new Login()