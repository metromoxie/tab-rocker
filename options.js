function save_options() {
	var binding = {
		"ctrl": true,
		"meta": false,
		"keycode": 66
	}
	var ctrl = true;
	var meta = false;
	var keybinding = 66;

	chrome.storage.local.set({'binding': binding}, function () {
		if (chrome.runtime.lastError) {
			// There was an error. For now, log there was an error and return.
			console.error('There was an error saving the settings for ' +
			  'the Tab Rocker extension: ' + chrome.runtime.lastError);
			return;
		}
	});
}

function restore_options() {
	chrome.storage.local.get('binding', function(binding) {
		if (chrome.runtime.lastError) {
			// There was an error. For now, log there was an error and return.
			console.error('There was an error retrieving the settings for ' +
			  'the Tab Rocker extension: ' + chrome.runtime.lastError);
			return;
		}
	});
}

save_options();
restore_options();
