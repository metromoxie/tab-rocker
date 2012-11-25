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
var $window = $(window);
var BINDING = undefined;
var PORT;

function matchesBinding (e) {
	var alt = e.altKey;
	var ctrl = e.ctrlKey;
	var meta = e.metaKey;
	var keycode = e.shiftKey ? e.which : (e.which + 32);

	return BINDING && BINDING.alt === alt && BINDING.ctrl === ctrl &&
	  BINDING.meta === meta && BINDING.keycode === keycode;
}

// Keyboard keyup listener callback.
function keyListener (e) {
	if (matchesBinding(e)) {
		chrome.extension.sendMessage('update');
	}
}

// Open a port for an extended connection with the background page so it can
// communicate updates to us every time a binding changes.
PORT = chrome.extension.connect();
PORT.onMessage.addListener(function (msg) {
	BINDING = JSON.parse(msg);
});

// We only want tab rocker to work on the top frame, not any of the sub frames.
if (window == top) {
	$window.keydown(keyListener);
}
