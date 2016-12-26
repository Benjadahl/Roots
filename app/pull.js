var linkNodes = document.links;
var links = [];
var valueList = [];
const domain = getDomain(window.location.href, true);
console.log(domain);

//Configurations
const slashWeight = 5;
const sameDomainWeight = 10;
const bannedKeywords = [
    //Technical bans
    "javascript:","#", "?",
    //Banned sites
    "goo.gl","bit.ly","adf.ly","youtube.com","imgur"
];

for (i = 0; i < linkNodes.length; i++){
    const link = linkNodes[i].href;
    var containsBanned = false;

    for(t = 0; t < bannedKeywords.length; t++){
        if(link.includes(bannedKeywords[t])){
            containsBanned = true;
        }
    }

    if(containsBanned === false){
        const linkLength = link.length;
        //A score for the relevance of the link, lower is better
        var relevanceScore = link.length;

        //The amount of slashes in the link should add to the relevanceScore
        const slashes = (link.match(/\//g) || []).length;
        relevanceScore += slashes * slashWeight;

        //Check if the link is not from the same domain
        if(!link.includes(domain)){
            relevanceScore += sameDomainWeight + domain.length;
        }

        console.log(link + " relevanceScore " + relevanceScore);

        if(typeof valueList[relevanceScore] !== "object"){
            valueList[relevanceScore] = [];
        }

        if(valueList[relevanceScore].indexOf(link) === -1){
            valueList[relevanceScore].push(link);
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
