import Toggler from './libs/component';

const onDOMContentLoadedTasks = [() => {
	Toggler.init('.js-toggle');
	Toggler.init('.js-toggle__local', {
		local: true,
		delay: 0,
		callback: function() {
			if(this.open){
				global.Togglers.forEach(toggler => {
					if(toggler !== this && !!toggler.open && toggler.DOMElement !== this.targetElement){
						toggler.toggle();
					}
				});
			}
		}
	});
}];

global.Togglers = {};
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });