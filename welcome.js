$(document).ready(function () {
	$('#reload-tabs').click(function () {
		chrome.tabs.query({}, function (alltabs) {
			var i;
			for (i in alltabs) {
				chrome.tabs.reload(alltabs[i].id);
			}

			chrome.tabs.getCurrent(function (tab) {
				chrome.tabs.remove([ tab.id ]);
			});
		});
	});

	// Make the options link open in a new tab.
	$('#options-anchor').click(function() {
		chrome.tabs.create({ 'url': 'options.html' });
	});
});
