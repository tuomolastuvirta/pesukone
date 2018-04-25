var should = require('chai').should();
var expect  = require("chai").expect;
var supertest = require('supertest');
// below works if the app is running!!!
//var api = supertest('http://localhost:3000');
var api2 = supertest(require('../app')); // this starts the api listener automatically!!!!
// Huom! Jos testanaan vain jo käynnissä olevaa listeneriä
// laita api2 kommentteihin ja ota api käyttöön! !

describe("Pesukone API", function() {

  it('status post should return a 200 response', function (done) {
    api2.post('/api/status')
        //.set('Accept', 'application/json')
        .expect(200, done);
  });


  it('status post should return idle status', function (done) {
    api2.post('/api/status')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
        //    expect(res.body).to.have.property("name");
        //expect(res.body.name).to.not.equal(null);
        //    expect(res.body).to.have.property("email");
            expect(res.body).to.equal('idle');
            done();
        });
  });

  it('start washing machine should return a 200 response', function (done) {
    this.timeout(40000);
    api2.post('/api/start')
        //.set('Accept', 'application/json')
        //.expect(Promise,done);
        .expect(200, done);

  });

  it('should return idle when finished washing', function (done) {
    api2.post('/api/status')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
        //    expect(res.body).to.have.property("name");
        //expect(res.body.name).to.not.equal(null);
        //    expect(res.body).to.have.property("email");
            expect(res.body).to.equal('idle');
        //    expect(res.body).to.have.property("phoneNumber");
        //    expect(res.body.phoneNumber).to.not.equal(null);
        //    expect(res.body).to.have.property("role");
        //    expect(res.body.role).to.not.equal(null);
            done();
        });
  });

  it('should return idle after abort', function (done) {
    api2.post('/api/abort')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
        //    expect(res.body).to.have.property("name");
        //expect(res.body.name).to.not.equal(null);
        //    expect(res.body).to.have.property("email");
            expect(res.body).to.equal('idle');
        //    expect(res.body).to.have.property("phoneNumber");
        //    expect(res.body.phoneNumber).to.not.equal(null);
        //    expect(res.body).to.have.property("role");
        //    expect(res.body.role).to.not.equal(null);
            done();
        });
  });
        // Close server
        //api2.close();
});
