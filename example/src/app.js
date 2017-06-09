import Toggler from './libs/component';

const onDOMContentLoadedTasks = [() => {
	Toggler.init('.js-toggle');
	let t = Toggler.init('.js-toggle__local', {
		delay: 0
	});

	console.log(t);
}];

global.Togglers = {};
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });