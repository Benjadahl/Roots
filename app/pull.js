var linkNodes = document.links;
var links = [];
var slashList = [];

for (i = 0; i < linkNodes.length; i++){
    const link = linkNodes[i].href;
    if(!link.includes("javascript:")){
        const slashes = (link.match(/\//g) || []).length;

        if(typeof slashList[slashes] !== "object"){
            slashList[slashes] = [];
        }

        if(slashList[slashes].indexOf(link) === -1){
            slashList[slashes].push(link);
        }
    }
}

for (i = 0; i < slashList.length; i++){
    const slashCategory = slashList[i];
    if(typeof slashCategory !== "undefined"){
        for (t = 0; t < slashCategory.length; t++){
            links.push(slashCategory[t]);
        }
    }
}

console.log(links);

chrome.runtime.sendMessage({
  links: links
});
