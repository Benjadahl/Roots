var linkNodes = document.links;
var links = [];

for (i = 0; i < linkNodes.length; i++){
    const link = linkNodes[i].href;
    if(!link.includes("javascript:")){
        links.push(linkNodes[i].href);
    }
}

chrome.runtime.sendMessage({
  links: links
});
