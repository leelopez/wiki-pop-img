chrome.runtime.onInstalled.addListener(function() {
	var context = "selection";
	var title = "Show images for selected text";
	var showForPages = ["*://*.wikipedia.org/*"];
	var id = chrome.contextMenus.create({
		"title": title,
		"contexts":[context],
		"id": "context" + context,
		"documentUrlPatterns":showForPages
	});  
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
	var sText = info.selectionText;
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {message: sText});
	});
};