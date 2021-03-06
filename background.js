/*
 * Copyright 2012 by Joel Weinberger
 *
 * This file is a part of Tab Rocker.
 * 
 * Tab Rocker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Tab Rocker is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Tab Rocker.  If not, see <http://www.gnu.org/licenses/>.
 */

var LASTTAB = undefined;
var CURRENTTAB = undefined;
var BINDING = undefined;
var BINDING_LISTENERS = {};

function rockTabs() {
	if (LASTTAB !== undefined) {
		chrome.tabs.update(LASTTAB, {active: true});
	}
}

function setBinding(binding) {
	var tab;
	var bindingJSON;
	
	BINDING = binding;
	bindingJSON = JSON.stringify(BINDING);

	for (tab in BINDING_LISTENERS) {
		BINDING_LISTENERS[tab].postMessage(bindingJSON);
	}
}

function restoreBinding(callback) {
	chrome.storage.local.get('binding', function(storage) {
		var binding = storage.binding;
		if (chrome.runtime.lastError) {
			// There was an error. For now, log there was an error and return.
			console.error('There was an error retrieving the settings for ' +
			  'the Tab Rocker extension: ' + chrome.runtime.lastError);
			return;
		}

		if (!binding) {
			// The default binding is "ctrl-b"
			binding = {
				"alt": false,
				"ctrl": true,
				"meta": false,
				"keycode": 98
			}
		}

		setBinding(binding);

		if (callback) {
			callback(binding);
		}
	});
}

function setupBrowserAction() {
	chrome.browserAction.onClicked.addListener(function(tab) {
		rockTabs();
	});
}

// Shows the welcome screen if and only if this is the first use of the
// extension right after installing it.
function showWelcome() {
	chrome.storage.local.get('installed', function(storage) {
		if (!storage.installed) {
			chrome.tabs.create({ 'url': 'welcome.html' });
			chrome.storage.local.set({ 'installed': true });
		}
	});
}

chrome.tabs.onActivated.addListener(function(info) {
	var currenttab = info.tabId;
	LASTTAB = CURRENTTAB;
	CURRENTTAB = currenttab;
});

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request === 'update') {
			rockTabs();
		}
	});

chrome.extension.onConnect.addListener(function (port) {
	// Registers a request for any time there's an update to the bindings and
	// immediately sends an update with the current binding.
	var id = port.sender.tab.id;
	BINDING_LISTENERS[id] = port;
	port.onDisconnect.addListener(function() {
		delete BINDING_LISTENERS[id];
	});
	port.postMessage(JSON.stringify(BINDING));
});

// Restores the stored binding configuration.
restoreBinding();

// Setup the browser action button.
setupBrowserAction();

// Check to see if the extension has been installed before. If not, go to the
// welcome screen.
showWelcome();
