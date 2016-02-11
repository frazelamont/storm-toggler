/**
 * @name storm-toggler: Accessible class-toggling for CSS-based UI state manipulation
 * @version 0.2.1: Wed, 10 Feb 2016 17:28:27 GMT
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
    
    var instances = [],
        defaults = {
            delay: 200,
            targetLocal: false,
            callback: null
        },
        lastFocus,
        merge = require('merge'),
        classlist = require('dom-classlist'),
        attributelist = require('storm-attributelist');
    
    
    function StormToggler(el, opts) {
        var self = this,
            ariaControls;
        
        this.settings = merge({}, defaults, opts);
        
        this.btn = el;
        this.targetId = (el.getAttribute('href')|| el.getAttribute('data-target')).substr(1);
        this.targetElement = document.getElementById(this.targetId);
        this.classTarget = (!this.settings.targetLocal) ? document.documentElement : this.targetElement.parentNode;
        
        if((!this.settings.targetLocal)) {
            this.statusClass = ['on--', this.targetId].join('');
            this.animatingClass = ['animating--', this.targetId].join('');
        } else {
            this.statusClass = 'active';
            this.animatingClass = 'animating';
        }
        
        ariaControls = this.targetId;
        
        attributelist.set(this.btn, {
            'role' : 'button',
            'aria-controls' : ariaControls,
            'aria-expanded' : 'false'
        });
        
        attributelist.set(this.targetElement, {
            'aria-hidden': true
        });
        
        this.btn.addEventListener('click', function(e) { self.toggle.call(self, e); }, false);
    }
    
    StormToggler.prototype.toggle = function(e) {
        var self = this,
            delay = classlist(this.classTarget).contains(this.statusClass) ?  this.settings.delay : 0;
        
        e.preventDefault();
        e.stopPropagation();
        
        classlist(this.classTarget).add(this.animatingClass);
        
        window.setTimeout(function() {
            classlist(this.classTarget).remove(this.animatingClass);
            classlist(this.classTarget).toggle(this.statusClass);
            attributelist.toggle(this.btn, 'aria-expanded');
            attributelist.toggle(this.targetElement, 'aria-hidden');
            (!!this.settings.callback && typeof this.settings.callback === 'function') && this.settings.callback.call(self);
        }.bind(this), delay);
    };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Toggler cannot be initialised, no augmentable elements found');
        }
        
        return instances = els.map(function(el){
            return new StormToggler(el, opts);
        });
    }
    
    function reload(els, opts) {
        //retain toggled elements and state
        //iterate through instances, check if DOMElement matches els, if not create new instance and push into array 
        /*
        destroy();
        init(els, opts);
        */
    }
    
    function destroy() {
        instances = [];  
    }
	
	return {
		init: init,
		reload: reload,
		destroy: destroy
	};
	
 }));