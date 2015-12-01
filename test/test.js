'use strict';
var assert = require('assert')
  , forget = require('../forget.js');

describe('Forget', function() {

  beforeEach(function() {
    this.obj = {
      a:{
        b: {
          c: null
        },
        d: [1, 2, 3, 4]
      }
    }
  })

  it('Should delete nested property in object', function() {
    assert.deepEqual(forget(this.obj, 'a.b.c'), {a:{b: {}, d: [1, 2, 3, 4]}});
  });

  it('Should delete nested property in array', function() {
    var tester = {a: {b: [1,[2,2],3,4]}};
    forget(tester, 'a.b[1]');
    assert.deepEqual(tester, {a: {b: [1,3,4]}});
  });

  it('Should delete property in object', function() {
    assert.deepEqual(forget(this.obj, 'a'), {});
    assert.deepEqual(forget(this.obj, 'q'), this.obj);
  });

  it('Should delete property in array', function() {
    assert.deepEqual(forget({a: [1,3,4]}, 'a[2]'), {a: [1,3]});
    assert.deepEqual(forget({a: [1,3,4]}, 'a[4]'), {a: [1,3,4]});
  });
});
