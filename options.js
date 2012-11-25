var BINDING = undefined;

function save_options() {
	chrome.storage.local.set({'binding': binding}, function () {
		if (chrome.runtime.lastError) {
			// There was an error. For now, log there was an error and return.
			console.error('There was an error saving the settings for ' +
			  'the Tab Rocker extension: ' + chrome.runtime.lastError);
			return;
		}
	});
}

// Takes an optional binding as an argument. If none is given, will attempt to
// restore from local storage.
function restore_options(binding) {
	var restore = function (binding) {
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
	};

	// If a binding argument is given, use that instead of local storage.
	if (binding) {
		restore(binding);
		return;
	}

	chrome.storage.local.get('binding', function(binding) {
		if (chrome.runtime.lastError) {
			// There was an error. For now, log there was an error and return.
			console.error('There was an error retrieving the settings for ' +
			  'the Tab Rocker extension: ' + chrome.runtime.lastError);
			return;
		}

		if (!binding) {
			console.log('no binding by default');
		}

		restore(binding);
	});
}

function setup() {
	// A = 65, Z = 90
	// a = 97, z = 122
	// TODO We may want to modify this to use some sort of jQuery magic to
	// handle a wider set of cases than just alphabet keys.
	var keyListener = function (e) {
		console.log('key received');
		var binding = {};
		// Only alphabet characters
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			console.log('valid key!');
			binding = {
				"alt": e.altKey,
				"ctrl": e.ctrlKey,
				"meta": e.metaKey,
				"keycode": e.shiftKey ? e.keyCode : (e.keyCode + 32)
			};
			BINDING = binding;

			restore_options(binding);
		}
	}

	restore_options();
	window.addEventListener("keydown", keyListener, false);
}
setup();
