import { el } from './elements'
import toast from '../../components/toast'
import login from '../../components/login'
class LoginPage {
    constructor(){
        this.toast = toast
        this.login = login
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    singIn() {
        cy.contains(el.loginButton).click()
    }

    validLogin() {
        cy.contains(el.messageDash).should('be.visible')
    }

    alertHaveText(expectedText){
        cy.contains(el.alertError, expectedText).should('be.visible')
    }
}

export default new LoginPage()