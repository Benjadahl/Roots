console.log("Loading background script");

var linksPerTab = {};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        //Save the link array that is sent from content script
        if(typeof request.links !== "undefined"){
            console.log("Saving links for tab " + sender.tab.id);
            linksPerTab[sender.tab.id] = request.links;
            console.log(linksPerTab);
        }
        //Respond with the link array for the correct tab id
        if(typeof request.tabID !== "undefined"){
            console.log("Sending links for tab " + request.tabID);
            if(typeof linksPerTab[request.tabID] !== "undefined"){
                sendResponse({links: linksPerTab[request.tabID]});
            }
        }
    }
);

//Deal with the fact that chrome might replace a tab at any point in time
chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
    console.log("Replacing tab " + removedTabId + " with " + addedTabId);
    linksPerTab[addedTabId] = linksPerTab[removedTabId];
    delete linksPerTab[removedTabId];
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    delete linksPerTab[tabId];
    console.log("Deleting tab " + tabId);
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("Settings default values");
        const bannedKeywords = [
            //Technical bans
            "javascript:","#", "?",
            //Banned sites
            "goo.gl","bit.ly","adf.ly","youtube.com","imgur"
        ];
        chrome.storage.sync.set({"bannedKeywords": bannedKeywords});
    }
});
