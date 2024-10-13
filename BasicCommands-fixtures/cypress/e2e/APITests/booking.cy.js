

describe('Test suit - Booking API Testing', () => {

})

describe('Test Suit - Booking API Testing with custom commands', () => {

    beforeEach(() => {
        cy.fixture('booking/bookingPost.json').as('newBooking');
        cy.fixture('booking/bookingPut.json').as('updateBooking');
    })
    
    it('1 - GET all booking ids',   () => {

        cy.getRequest('booking', {'Content-Type': 'application/json'}).then((response)=>{    
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        })
    })

    it('2 - GET booking by firstname ',   () => {

        let queryString = {'firtname' : 'test'};

        cy.getRequest('booking', {'Content-Type': 'application/json'}, queryString).then((response)=>{    
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        })
    })

    it('3 - POST Create booking status ok 200 ',   () => {
        cy.get('@newBooking').then((newBooking) => {

        cy.postRequest('booking', {'Content-Type': 'application/json'}, newBooking).then((response)=>{    
    
                expect(response.status).to.eq(200);
                expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('bookingid').and.to.be.a('number');
                expect(response.body).to.have.property('booking').and.to.be.a('object');
                expect(response.body.booking).to.have.property('firstname', 'Jim').and.to.be.a('string');
                expect(response.body.booking).to.have.property('lastname', 'Brown').and.to.be.a('string');
                expect(response.body.booking).to.have.property('totalprice', 1211).and.to.be.a('number');
                expect(response.body.booking).to.have.property('depositpaid', true).and.to.be.a('boolean');
                expect(response.body.booking).to.have.property('bookingdates').and.to.be.a('object');
                expect(response.body.booking.bookingdates).to.have.property('checkin', '2018-01-01').and.to.be.a('string');
                expect(response.body.booking.bookingdates).to.have.property('checkout', '2019-01-01').and.to.be.a('string');
                expect(response.body.booking).to.have.property('additionalneeds', 'Breakfast').and.to.be.a('string');
                
            })

        })
    })

    it('4 - PUT Updated booking status forbidden 403 ',   () => {

        cy.get('@newBooking').then((newBooking) => {

        cy.postRequest('booking', {'Content-Type': 'application/json'}, newBooking)
        .then((response)=>{    
            cy.get('@updateBooking').then((updateBooking) => {
                cy.putRequest(`/booking/${response.body.bookingid}`, {'Content-Type': 'application/json'}, updateBooking)
                .then((response)=>{  
                    expect(response.status).to.eq(403);
                    expect(response.headers).to.have.property('content-type', 'text/plain; charset=utf-8');
           
                    })
                })
            })
        })
    })

    it('5 - PUT Updated booking status ok 200 ',   () => {

        cy.get('@newBooking').then((newBooking) => {

        cy.postRequest('booking', {'Content-Type': 'application/json'}, newBooking)
        .then((response)=>{    
            cy.get('@updateBooking').then((updateBooking) => {

                let Authorization = Cypress.env('Authorization')
                  
                cy.putRequest(`/booking/${response.body.bookingid}`, {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': Authorization}, updateBooking)
                .then((response)=>{  
                    expect(response.status).to.eq(200);

                    })
                })
            })
        })
    })
})