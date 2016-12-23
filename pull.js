var linkNodes = document.links;
var links = [];

for (i = 0; i < linkNodes.length; i++){
    links.push(linkNodes[i].href);
}
console.log(links);

chrome.runtime.sendMessage({
  links: links
});
