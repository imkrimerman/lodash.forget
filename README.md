# Lodash `forget` missing method
Lodash includes great `has`, `get` and `set` methods, but _NOT_ one that will `remove` value with the same recursive way. 

## Introducing `forget`. 
It supports same nested syntax as `get`, `set` and `has` in Lodash module and removes appropriate found value.

## Installation
```
npm i lodash-forget --save
```
## How to use
```js
var forget = require('lodash-forget')
  , object = { 'a': { 'b': { 'c': 3, 'd': [1, 2] } } };
   
forget(object, 'a.b.c');
// => { 'a': { 'b': { 'd': [1, 2] } } };

forget(object, 'a.b.d[0]');
// => { 'a': { 'b': { 'd': [2] } } };

forget(object, 'a');
// => {};

//  Or use lodash mixin
_.mixin({ forget: forget });
```
