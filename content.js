// Keyboard keyup listener callback.
var keyListener = function (e) {
  if (e.keyCode === 66 && e.ctrlKey && !e.metaKey && !e.shiftKey) {
    chrome.extension.sendMessage("update");
  }
}

if (window == top) {
  window.addEventListener("keyup", keyListener, false);
}

