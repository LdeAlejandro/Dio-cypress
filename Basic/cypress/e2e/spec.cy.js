// it.only is used to test only that specified test.

describe('Learning cypress concepts', () => {

  beforeEach(() => {
    // Code to run before each test
    cy.visit('/');
  });
  
  // it('visiting home passes', () => {
  //   cy.visit('/');
  // });

  it('1 - user invalid login', () => {
    // cy.visit('/');
    cy.get('.shop-menu').contains('Login')
      .should('have.attr', 'href', '/login')
      .click();

    cy.contains('Login to your account').should('be.visible');

    cy.get('[data-qa="login-email"]')
      .type('test@email.com')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.attr', 'type', 'email')
      .and('have.prop', 'required');

    cy.get('[data-qa="login-password"]').type('123456').should('have.value', '123456');

    cy.get('[data-qa="login-button"]').as('btnLogin').then(($button) => {
      // chai syntax
      expect($button).to.have.text('Login');
      expect($button).to.contain('Login');
      expect($button).to.have.attr('type', 'submit');
      expect($button).to.have.class('btn');

      // returning to Cypress syntax to click
      cy.wrap($button).click();
    });

    // clicking with alias
    // cy.get('@btnLogin').click();
    cy.contains('Your email or password is incorrect!');

  });

  it('2 - Accessing the home page of Automation Exercise', () => {
    // cy.visit('/');
    cy.contains('Automation');
    cy.get('h1').contains('Automation'); 
    cy.get('.features_items');

  });

  it('3 - Checking items available for purchase', () => {
    // cy.visit('/');
    cy.get('.features_items'); 
    cy.get('.features_items').children().first();
    cy.get('.features_items').children().last();
    cy.get('.features_items').children().eq(2); 

    cy.get('[data-product-id="2"]'); // by data-id

  });

  it('4 - Adding an item to the cart and continue shopping', () => {
    // cy.visit('/');
    cy.get('[data-product-id="2"]').contains('Add to cart').click();
 
    cy.get('#cartModal').contains('Added');

    cy.get('button.close-modal', {timeout: 5000}).click();

  });

  it('5 - Accessing the products page - using intercept', () => {
    // cy.visit('/');
    cy.intercept('GET', '/products').as('getProducts');
    
    cy.get('.navbar-nav').contains('Products').then(($btn) => {
      cy.wrap($btn).click();
    });

    cy.wait('@getProducts').its('response.statusCode').should('eq', 200);

    /* cy.wait('@getProducts').should((interception) => {
        expect(interception.response.statusCode).to.be.eq(200);
    }); */

    it('6 - GET Products returns 200 - using request', () => {
      cy.request('GET', 'api/productList').should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.be.empty;

        let body = JSON.parse(response.body);
        expect(body).to.be.an('array');
        expect(body.products).to.have.length(1);
      });
    });
  });
});
