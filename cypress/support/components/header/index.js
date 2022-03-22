import {el} from './elements'
class Header{
    userLoggedIn(userName) {
        cy.get(el.fullName, { timeout: 10000 }).should('be.visible').should('have.text', userName)
    }
}
export default new Header()