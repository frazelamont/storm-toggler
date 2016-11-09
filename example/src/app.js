import Toggler from './libs/storm-toggler';

const onDOMContentLoadedTasks = [() => {
	Toggler.init('.js-toggle');
	Toggler.init('.js-toggle-local', {
		targetLocal: true,
		delay: 0
	});
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });
