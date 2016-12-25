var linkNodes = document.links;
var links = [];
var valueList = [];

//Configurations
const slashWeight = 5;

for (i = 0; i < linkNodes.length; i++){
    const link = linkNodes[i].href;
    if(!link.includes("javascript:")){
        const linkLength = link.length;
        //A score for the relevance of the link, lower is better
        var relevanceScore = link.length;

        //The amount of slashes in the link should add to the relevanceScore
        const slashes = (link.match(/\//g) || []).length;
        relevanceScore += slashes * slashWeight;

        if(typeof valueList[linkLength] !== "object"){
            valueList[linkLength] = [];
        }

        if(valueList[linkLength].indexOf(link) === -1){
            valueList[linkLength].push(link);
        }
    }
}

for (i = 0; i < valueList.length; i++){
    const valueCategory = valueList[i];
    if(typeof valueCategory !== "undefined"){
        for (t = 0; t < valueCategory.length; t++){
            links.push(valueCategory[t]);
        }
    }
}

console.log(links);

chrome.runtime.sendMessage({
  links: links
});
