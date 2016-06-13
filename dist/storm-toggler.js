/**
 * @name storm-toggler: Accessible class-toggling for CSS-based UI state manipulation
 * @version 0.7.1: Mon, 13 Jun 2016 16:01:05 GMT
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
		StormToggler = {
			init: function() {
				this.targetElement = document.getElementById(this.targetId);
        		this.classTarget = (!this.settings.targetLocal) ? document.documentElement : this.targetElement.parentNode;
                this.siblingBtns = [].slice.call(document.querySelectorAll('.js-toggle[href*="#' + this.targetId + '"], .js-toggle[data-target*="#' + this.targetId + '"]'));
                    
				if((!this.settings.targetLocal)) {
					this.statusClass = ['on--', this.targetId].join('');
					this.animatingClass = ['animating--', this.targetId].join('');
				} else {
					this.statusClass = 'active';
					this.animatingClass = 'animating';
				}
        
				STORM.UTILS.attributelist.set(this.btn, {
					'role' : 'button',
					'aria-controls' : this.targetId,
					'aria-expanded' : 'false'
				});

				STORM.UTILS.attributelist.set(this.targetElement, {
					'aria-hidden': true
				});

				this.btn.addEventListener('click', function(e) { this.toggle.call(this, e); }.bind(this), false);
			},
			toggle: function(e){
				var delay = STORM.UTILS.classlist(this.classTarget).contains(this.statusClass) ?  this.settings.delay : 0;
				
				if(!!e){
                    e.preventDefault();
                    e.stopPropagation();
                }
                
				STORM.UTILS.classlist(this.classTarget).add(this.animatingClass);
				
				window.setTimeout(function() {
					STORM.UTILS.classlist(this.classTarget).remove(this.animatingClass);
					STORM.UTILS.classlist(this.classTarget).toggle(this.statusClass);
                    this.siblingBtns.forEach(function(sibling){
					   STORM.UTILS.attributelist.toggle(sibling, 'aria-expanded');
                    });
					STORM.UTILS.attributelist.toggle(this.targetElement, 'aria-hidden');
					(!!this.settings.callback && typeof this.settings.callback === 'function') && this.settings.callback.call(this);
				}.bind(this), delay);
			}
		};
	
	function create(el, i, opts) {
		instances[i] = STORM.UTILS.assign(Object.create(StormToggler), {
			btn: el,
			targetId: (el.getAttribute('href')|| el.getAttribute('data-target')).substr(1),
			settings: STORM.UTILS.merge({}, defaults, opts)
		});
		instances[i].init();
	}
	
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Toggler cannot be initialised, no augmentable elements found');
        }
		
		els.forEach(function(el, i) {
			create(el, i, opts);
		});
        return instances;
        
    }
    
    function reload(sel, opts) {
		[].slice.call(document.querySelectorAll(sel)).forEach(function(el, i){
			if(!instances.filter(function(instance){ return (instance.btn === el); }).length) {
				create(el, instances.length, opts);
			}
		});
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