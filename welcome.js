$(document).ready(function () {
	$('#reload-tabs').click(function () {
		// TODO Reload and close all tabs here
	});

	// Make the options link open in a new tab.
	$('#options-anchor').click(function() {
		console.log('foobar');
		chrome.tabs.create({ 'url': 'options.html' });
	});
});
