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

chrome.tabs.onActivated.addListener(function(info) {
	var currenttab = info.tabId;
	LASTTAB = CURRENTTAB;
	CURRENTTAB = currenttab;
});

function setBinding(binding) {
  var tab;

  BINDING = binding;

  for (tab in BINDING_LISTENERS) {
    BINDING_LISTENERS[tab](BINDING);
  }
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request === 'update') {
      if (LASTTAB !== undefined) {
        chrome.tabs.update(LASTTAB, {active: true});
      }
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
