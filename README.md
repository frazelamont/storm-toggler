# Storm Toggler

[![Build Status](https://travis-ci.org/mjbp/storm-toggler.svg?branch=master)](https://travis-ci.org/mjbp/storm-toggler)
[![codecov.io](http://codecov.io/github/mjbp/storm-toggler/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-toggler?branch=master)
[![npm version](https://badge.fury.io/js/storm-toggler.svg)](https://badge.fury.io/js/storm-toggler)

Class and ARIA toggle UI state manipulation

## Example
[https://mjbp.github.io/storm-toggler](https://mjbp.github.io/storm-toggler)

## Usage
Installation
```
npm i -S storm-toggler
```

### Global toggle
For document-level state changes such as off-canvas menus

HTML
```
<a href="#nav" class="js-toggle"></a>
<div id="nav" class="nav"></div>
```
JS
either using es6 import
```
import Toggler from 'storm-toggler';

Toggler.init('.js-toggle');
```
or aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-toggler.standalone.js')
    .then(() => {
        StormToggler.init('.js-toggler');
    });
```
CSS
```
.nav {
    position:fixed;
    transform:translateX(100%);
    transition: transform 160ms ease;
}
.on--nav .nav {
    transform:translateX(0);
}
```

### Local toggle
To encapsulate a toggle state within part of the document

HTML
```
<div class="parent">
    <a href="#child-target" class="js-toggle__local"></a>
    <div id="child-target" class="child"></div>
</div>
```
JS
either using es6 import
```
import Toggler from 'storm-toggler';

Toggler.init('.js-toggle__local', {
    local: true
});
```
or aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-toggler.standalone.js')
    .then(() => {
        StormToggler.init('.js-toggle__local', {
            local: true
        });
    });
```
CSS
```
.child {
    max-height:0;
    overflow:hidden;
    transition: max-width 160ms ease;
}
.parent.active .child {
    max-height:1000px;
}
```

## Options
```
{
	delay: 0, //duration of animating out of toggled state
	startOpen: false,  //intial toggle state
	local: false, // encapsulate in small part of document
	prehook: false, //function to fire before each toggle
	callback: false, //function to fire after each toggle
	focus: true, //focus on first focusable child node of the target element
	trapTab: false //trap tab in the target element
}
```
e.g.
```
Toggler.init('.js-toggler', {
    startOpen: true
});
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

## Dependencies
None

## License
MIT