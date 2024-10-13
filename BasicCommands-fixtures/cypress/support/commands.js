// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postRequest', (endpoint, headers={}, body={}, qs={}) => {
    cy.request({
        method:'POST',
        url: endpoint,
        headers: headers,
        body: body,
        qs: qs,
        failOnStatusCode: true
    }).then((response)=>{
        debugger
        return response
    })
})

Cypress.Commands.add('getRequest', (endpoint, headers={}, body={}, qs={}) => {
    cy.request({
        method:'GET',
        url: endpoint,
        headers: headers,
        body: body,
        qs: qs,
        failOnStatusCode: false
    }).then((response)=>{
        return response
    })
})

Cypress.Commands.add('putRequest', (endpoint, headers={}, body={}, qs={}) => {
    cy.request({
        method:'PUT',
        url: endpoint,
        headers: headers,
        body: body,
        qs: qs,
        failOnStatusCode: false
    }).then((response)=>{
        debugger
        return response
    })
})

