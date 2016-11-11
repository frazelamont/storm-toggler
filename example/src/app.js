import Toggler from './libs/storm-toggler';

const onDOMContentLoadedTasks = [() => {
	Toggler.init('.js-toggle');
	global.Togglers =Toggler.init('.js-toggle-local', {
		targetLocal: true,
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
