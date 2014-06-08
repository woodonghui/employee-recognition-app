var expect = require('chai').expect;


// Synchronous code
// When testing synchronous code, 
// omit the callback and Mocha will 
// automatically continue on to the next test.
describe('Array', function(){

  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      expect([1,2,3].indexOf(5)).to.equal(-1);
      expect([1,2,3].indexOf(0)).to.equal(-1);
    });

  });

});


describe('Array', function(){

    it('should return index when the value is present', function(){
      expect([1,2,3].indexOf(1)).to.equal(0);
      expect([1,2,3].indexOf(3)).to.equal(2);
    });

});


// Asynchronous code

// Testing asynchronous code with Mocha 
// could not be simpler! Simply invoke 
// the callback when your test is complete. 
// By adding a callback (usually named done) 
// to it() Mocha will know that it should wait for completion.

describe('User', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      // console.log('user is saved');
      done();
    })
  });

  describe('#delete()', function(){
    it('should delete without error', function(done){
      // console.log('user is deleted');
      done();
    })
  });

});