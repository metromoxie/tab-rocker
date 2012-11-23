// Keyboard keyup listener callback.
var keyListener = function (e) {
  if (e.keyCode === 66 && e.ctrlKey && !e.metaKey && !e.shiftKey) {
    console.log("ctrl-b");
    chrome.extension.sendMessage("blah");
    console.log("ctrl-b again");
  }
}

if (window == top) {
  window.addEventListener("keyup", keyListener, false);
}

