var BINDING = undefined;

function saveOptions(callback) {
	chrome.storage.local.set({'binding': BINDING}, function () {
		if (chrome.runtime.lastError) {
			// There was an error. For now, log there was an error and return.
			console.error('There was an error saving the settings for ' +
			  'the Tab Rocker extension: ' + chrome.runtime.lastError);
			callback(true);
			return;
		}
		callback(false);
	});
}

function setBinding(binding) {
	var commandElt = document.getElementById('command');
	var command = '';

	if (binding.alt) {
		command += 'alt-';
	}
	if (binding.ctrl) {
		command += 'ctrl-';
	}
	if (binding.meta) {
		command += 'meta-';
	}
	command += String.fromCharCode(binding.keycode);

	commandElt.value = command;
	BINDING = binding;
}

// Attempts to load binding from local storage then sets the page to display the
// binding.
function restoreOptions() {
	chrome.extension.getBackgroundPage().restoreBinding(function (binding) {
		setBinding(binding);
	});
}

function resetToDefaults() {
	//default binding is ctrl-b
	var default_binding = {
		"alt": false,
		"ctrl": true,
		"meta": false,
		"keycode": 98 
	}
	var $statusElt = $('#status');
	chrome.extension.getBackgroundPage().setBinding(default_binding);
	setBinding(default_binding);
	saveOptions(function (error) {
		if (!error) {
			$statusElt.text('Reset successful.');
		} else {
			$statusElt.text('Reset failed.');
		}
		$statusElt.slideDown('slow').delay(1000).slideUp('slow');
	});
}

function setup() {
	var $window = $(window);
	var $updateBtn = $('#update');
	var $defaultsBtn = $('#defaults');
	var $statusElt = $('#status');
	// A = 65, Z = 90
	// a = 97, z = 122
	// TODO We may want to modify this to use some sort of jQuery magic to
	// handle a wider set of cases than just alphabet keys.
	var keyListener = function (e) {
		var binding = {};
		// Only alphabet characters
		if (e.which >= 65 && e.which <= 90) {
			binding = {
				"alt": e.altKey,
				"ctrl": e.ctrlKey,
				"meta": e.metaKey,
				"keycode": e.shiftKey ? e.which : (e.which + 32)
			};
			BINDING = binding;

			setBinding(binding);
			chrome.extension.getBackgroundPage().setBinding(binding);
		}
	}

	restoreOptions();
	$window.keydown(keyListener);

	$updateBtn.click(function () {
		saveOptions(function (error) {
			if (!error) {
				$statusElt.text('Update successful.');
			} else {
				$statusElt.text('Update failed.');
			}
			$statusElt.slideDown('slow').delay(1000).slideUp('slow');
		})});
	$updateBtn.focus();

	$defaultsBtn.click(function () {
		resetToDefaults();
	});
}

$(document).ready(function () {
	setup();
});
