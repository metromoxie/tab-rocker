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

// Keyboard keyup listener callback.
var keyListener = function (e) {
  if (e.keyCode === 66 && e.ctrlKey && !e.metaKey && !e.shiftKey) {
    chrome.extension.sendMessage("update");
  }
}

if (window == top) {
  window.addEventListener("keyup", keyListener, false);
}

