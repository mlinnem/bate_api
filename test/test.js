var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:5000');

describe('Voting', function() {
 
  it('Gives you a ballot', function() {
    api.get('/ballot')
    .set('x-api-key', '123myapikey')
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });
 
  it('Gives you a ballot', function(done) {
    api.get('/blog')
    .set('x-api-key', '123myapikey')
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });
 
  it('errors if bad x-api-key header', function(done) {
    api.get('/blog')
    .auth('correct', 'credentials')
    .expect(401)
    .expect({error:"Bad or missing app identification header"}, done);
  });
 
});