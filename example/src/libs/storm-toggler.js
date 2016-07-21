/**
 * @name storm-toggler: Accessible class-toggling for CSS-based UI state manipulation
 * @version 0.10.0: Thu, 21 Jul 2016 12:15:44 GMT
 * @author mjbp
 * @license MIT
 */(function(root, factory) {
  if (typeof exports === 'object') {
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
                this.open = false;
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

				this.btn.addEventListener('click', function(e) { this.toggle.call(this, e); }.bind(this), false);
			},
            toggleAttributes: function(){
                this.open = !this.open;
                this.siblingBtns.forEach(function(sibling){
                    STORM.UTILS.attributelist.toggle(sibling, 'aria-expanded');
                });
            },
            toggleDocumentState: function(){
                this.classTarget.classList.remove(this.animatingClass);
                this.classTarget.classList.toggle(this.statusClass);
            },
			toggle: function(e){
				var delay = this.classTarget.classList.contains(this.statusClass) ?  this.settings.delay : 0;
				
				if(!!e){
                    e.preventDefault();
                    e.stopPropagation();
                }
                
				this.classTarget.classList.add(this.animatingClass);
				
				window.setTimeout(function() {
                    this.toggleAttributes();
                    this.toggleDocumentState();
					(!!this.settings.callback && typeof this.settings.callback === 'function') && this.settings.callback.call(this);
				}.bind(this), delay);
			}
		};
	
	function create(el, i, opts) {
		instances[i] = Object.assign(Object.create(StormToggler), {
			btn: el,
			targetId: (el.getAttribute('href')|| el.getAttribute('data-target')).substr(1),
			settings: Object.assign({}, defaults, opts)
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