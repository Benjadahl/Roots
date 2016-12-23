console.log("Loading background script");

var linksPerTab = {};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(typeof request.links !== "undefined"){
            console.log("Saving links for tab " + sender.tab.id);
            linksPerTab[sender.tab.id] = request.links;
            console.log(linksPerTab);
        }
        if(typeof request.tabID !== "undefined"){
            if(typeof linksPerTab[request.tabID] !== "undefined"){
                console.log("Sending links for tab " + request.tabID);
                sendResponse({links: linksPerTab[request.tabID]});
            }
        }
    }
);
