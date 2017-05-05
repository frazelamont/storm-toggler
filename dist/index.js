/**
 * @name storm-toggler: Accessible UI state toggling
 * @version 1.1.0: Fri, 05 May 2017 10:05:22 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import componentPrototype from './lib/component-prototype';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(!els.length) throw new Error('Toggler cannot be initialised, no augmentable elements found');

	return els.map((el) => {
		return Object.assign(Object.create(componentPrototype), {
			btn: el,
			targetId: (el.getAttribute('href')|| el.getAttribute('data-target')).substr(1),
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

export default { init };