describe('Test suit - Auth API Testing', () => {

    it('1 - POST crendentials to auth endpoint with sucess - version 1', ()=>{
        //cy.request('GET', 'https://example.cypress.io');

        cy.request({
        method:'POST',
        url: '/auth',
        body: {
            "username": "admin",
            "password": "password123"
        },
        headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token').and.to.be.a('string');
            expect(response.body.token).to.not.be.empty;
        })
    })

    it('2 - POST crendentials to auth endpoint with sucess - version 2', ()=>{
        //cy.request('GET', 'https://example.cypress.io');

       let body = {
        "username": Cypress.env('username'),
        "password": Cypress.env('password')
       };

       cy.postRequest(Cypress.env('auth_url'),{"Content-type":"application/json"}, body)
       .then((response)=>{
        //debugger;
       cy.pause();
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token').and.to.be.a('string');
        expect(response.body.token).to.not.be.empty;
       })
    })

})