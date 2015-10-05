define('sectionInitializer', ['jquery'], function ($) {
	var section = $('body').data('section');

	require('pages.' + section);
})
