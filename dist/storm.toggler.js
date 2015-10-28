/**
 * @name storm-toggler: Accessible class-toggling for CSS-based UI state manipulation
 * @version 0.1.1: Wed, 28 Oct 2015 16:34:18 GMT
 * @author mjbp
 * @license MIT
 */(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormToggler = factory();
  }
}(this, function() {
	'use strict';
    
    var defaults = {
            delay: 200
        },
        lastFocus,
        UTILS = require('storm-utils');
    
    
    function StormToggler(el, opts) {
        var self = this,
            ariaControls;
        
        this.settings = UTILS.merge({}, defaults, opts);
        
        this.btn = el;
        this.docEl = document.documentElement;
        this.targetId = (el.getAttribute('href')|| el.getAttribute('data-target')).substr(1);
        this.targetElement = document.getElementById(this.targetId);
        this.statusClass = ['on--', this.targetId].join('');
        this.animatingClass = ['animating--', this.targetId].join('');
        
        ariaControls = this.targetId;
        
        UTILS.attributelist.add(this.btn, {
            'role' : 'button',
            'aria-controls' : ariaControls,
            'aria-expanded' : 'false'
        });
        
        UTILS.attributelist.add(this.targetElement, {
            'aria-hidden': true
        });
        
        this.btn.addEventListener('click', function(e) { self.toggle.call(self, e); }, false);
    }
    
    StormToggler.prototype.toggle = function(e) {
        var self = this,
            delay = !!document.querySelector('.' + self.statusClass) ? self.settings.delay : 0;
        
        e.preventDefault();
        e.stopPropagation();
        
        UTILS.classlist.add(this.docEl, this.animatingClass);
        
        window.setTimeout(function() {
            UTILS.classlist.remove(self.docEl, self.animatingClass)
                    .toggle(self.docEl, self.statusClass);
            UTILS.attributelist.toggle(self.btn, 'aria-expanded');
            UTILS.attributelist.toggle(self.targetElement, 'aria-hidden');
            
        }, delay);
    };
    
    function init(els, opts) {
        if(els.length === 0 || !('querySelectorAll' in document)) {
            throw new Error('Toggler cannot be initialised, unsupported browser or no toggleable elements');
        }
        var togglers = [];
        
        [].slice.call(els).forEach(function(el){
            togglers.push(new StormToggler(el, opts));
        });
        return togglers;
    }
	
	return {
		init: init
	};
	
 }));