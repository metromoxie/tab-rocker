/*
 * Copyright 2012 by Joel Weinberger
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

chrome.tabs.onActivated.addListener(function(info) {
	var currenttab = info.tabId;
	LASTTAB = CURRENTTAB;
	CURRENTTAB = currenttab;
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (LASTTAB !== undefined) {
	  chrome.tabs.update(LASTTAB, {active: true});
	}
  }
);
