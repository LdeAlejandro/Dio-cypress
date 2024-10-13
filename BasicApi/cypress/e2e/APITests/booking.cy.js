describe(`Test suit - Booking API Testing`, () => {

    beforeEach(()=>{
        cy.request({
            method: 'POST',
            url: "/auth",
            headers: {'Content-Type': 'application/json' },
            body: {
                "username": "admin",
                "password": "password123"
            },
        }).as('token')
    })


    it('1 - GET all bookings ids', ()=>{

        cy.request({
            method:'GET',
            url: '/booking',
            headers: {
                'Content-Type': 'application/json'
              },
              failOnStatusCode: false
        }).then((response)=>{   
            expect(response.status).to.eq(200);
            expect(response.body).to.be.a('array');
            expect(response.body).to.have.length.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        })
    })

    it('2 - GET all bookings by firstname', ()=>{

        cy.request({
            method:'GET',
            url: '/booking',
            qs:{'fisrtname':'test'},
            headers: {
                'Content-Type': 'application/json'
              },
              failOnStatusCode: false
        }).then((response)=>{   
            expect(response.status).to.eq(200);
            expect(response.body).to.be.a('array');
            expect(response.body).to.have.length.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        })
    })

    it('3 - Creating Book', ()=>{

        cy.request({
            method:'POST',
            url: '/booking',
            headers: {
                'Content-Type': 'application/json'
              },
            body:{
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 1211,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            },
              failOnStatusCode: false
        }).then((response)=>{   
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

            cy.wrap(response.body.bookingid).as('bookingid',{type: 'static'});

        }).then(function(){

            cy.get('@bookingid').then((bookingid)=>{
                
           
            cy.request({
                method:'GET',
                url: `/booking/${bookingid} `,
                headers: {
                    'Accept': 'application/json'
                },
                  failOnStatusCode: false
                }).then((response)=>{   
                    expect(response.status).to.eq(200);
                    expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('firstname', 'Jim').and.to.be.a('string');
                    expect(response.body).to.have.property('lastname', 'Brown').and.to.be.a('string');
                    expect(response.body).to.have.property('totalprice', 1211).and.to.be.a('number');
                    expect(response.body).to.have.property('depositpaid', true).and.to.be.a('boolean');
                    expect(response.body).to.have.property('bookingdates').and.to.be.a('object');
                    expect(response.body.bookingdates).to.have.property('checkin', '2018-01-01').and.to.be.a('string');
                    expect(response.body.bookingdates).to.have.property('checkout', '2019-01-01').and.to.be.a('string');
                    expect(response.body).to.have.property('additionalneeds', 'Breakfast').and.to.be.a('string');
        
                })
            })
            
        })
    })

    it('4 - Update Boooking by id with auth header', ()=>{

        cy.request({
            method:'POST',
            url: '/booking',
            headers: {
                'Content-Type': 'application/json'
              },
            body:{
                "firstname" : "Ana",
                "lastname" : "Garcia",
                "totalprice" : 1231,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            },
              failOnStatusCode: false
        }).then(response => {

            cy.get('@token').then((token)=>{          
           
            cy.request({
                method:'PUT',
                url: `/booking/${response.body.bookingid} `,
                auth: {user: 'admin', password: 'password123'},
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    //'Cookie': `token=${token}`
                    
                },
                body:{
                    "firstname" : "Juanito",
                    "lastname" : "Alejandro",
                    "totalprice" : 12341,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2018-01-01",
                        "checkout" : "2019-01-01"
                    },
                    "additionalneeds" : "Breakfast"
                },
                  failOnStatusCode: false
                }).then((response)=>{   
                    expect(response.status).to.eq(200);
                    expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('firstname', 'Juanito').and.to.be.a('string');
                    expect(response.body).to.have.property('lastname', 'Alejandro').and.to.be.a('string');
                    expect(response.body).to.have.property('totalprice', 12341).and.to.be.a('number');
                    expect(response.body).to.have.property('depositpaid', true).and.to.be.a('boolean');
                    expect(response.body).to.have.property('bookingdates').and.to.be.a('object');
                    expect(response.body.bookingdates).to.have.property('checkin', '2018-01-01').and.to.be.a('string');
                    expect(response.body.bookingdates).to.have.property('checkout', '2019-01-01').and.to.be.a('string');
                    expect(response.body).to.have.property('additionalneeds', 'Breakfast').and.to.be.a('string');
        
                })
            }) 
        })
    })

})