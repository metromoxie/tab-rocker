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
