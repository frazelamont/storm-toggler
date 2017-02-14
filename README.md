#Storm Toggler

[![Build Status](https://travis-ci.org/mjbp/storm-toggler.svg?branch=master)](https://travis-ci.org/mjbp/storm-toggler)
[![codecov.io](http://codecov.io/github/mjbp/storm-toggler/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-toggler?branch=master)
[![npm version](https://badge.fury.io/js/storm-toggler.svg)](https://badge.fury.io/js/storm-toggler)

Class and ARIA toggle UI state manipulation

##Usage
HTML
```
<a href="#target" class="js-toggler"></a>
<div id="target"></div>
```

JS
```
npm i -S storm-toggler
```
either using es6 import
```
import Toggler from 'storm-toggler';

Toggler.init('.js-toggler');
```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-toggler.standalone.js')
    .then(() => {
        StormToggler.init('.js-toggler');
    });
```
or es5 commonjs  (legacy, use the .standalone version in the /dist folder)
```
var Toggler = require('./libs/storm-toggler');

Toggler.init('.js-toggler');
```

##Example
[https://mjbp.github.io/storm-toggler](https://mjbp.github.io/storm-toggler)


##Options
```
    {
		delay: 0,
		targetLocal: false,
		callback: null
    }
```

e.g.
```
Toggler.init('.js-toggler', {
    delay: 200
});
```


##API
####`Toggler.init(selector, opts)`
Initialise the module with a DOM selector and  options object


##Tests
```
npm run test
```

##Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

##Dependencies
None

##License
MIT