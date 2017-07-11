/**
 * @name storm-toggler: Accessible UI state toggling
 * @version 1.3.0: Tue, 11 Jul 2017 19:34:48 GMT
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
			settings: Object.assign({}, defaults, el.dataset, opts)
		}).init();
	});
};

export default { init };