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
            if(typeof linksPerTab[request.tabID] !== "undefined"){
                console.log("Sending links for tab " + request.tabID);
                sendResponse({links: linksPerTab[request.tabID]});
            }
        }
    }
);

//Deal with the fact that chrome might replace a tab at any point in time
chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
    linksPerTab[addedTabId] = linksPerTab[removedTabId];
    delete linksPerTab[removedTabId];
});
