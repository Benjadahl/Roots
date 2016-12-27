var linkNodes = document.links;
var links = [];
var valueList = [];
const domain = getDomain(window.location.href);

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
    var link = linkNodes[i].href;
    var symbolicLink = link;
    var containsBanned = false;

    for(t = 0; t < bannedKeywords.length; t++){
        if(link.includes(bannedKeywords[t])){
            containsBanned = true;
        }
    }

    if(containsBanned === false){
        //Remove protocol from symbolicLink
        for(t = 0; t < link.length; t++){
            if(link[t] === "/" && link[t - 1] === "/"){
                symbolicLink = link.substring(t + 1, link.length);
            }
        }

        //A score for the relevance of the link, lower is better
        var relevanceScore = link.length;

        //The amount of slashes in the link should add to the relevanceScore
        const slashes = (link.match(/\//g) || []).length;
        relevanceScore += slashes * slashWeight;

        //Check if the link is not from the same domain
        if(!link.includes(domain)){
            relevanceScore += sameDomainWeight + domain.length;
        }else{
            const domainStart = symbolicLink.indexOf(domain);
            symbolicLink = symbolicLink.substring(0,domainStart) + "*" + symbolicLink.substring(domainStart + domain.length, symbolicLink.length);
        }

        if(typeof valueList[relevanceScore] !== "object"){
            valueList[relevanceScore] = [];
        }

        var alreadyExists = false;
        for(t = 0; t < valueList[relevanceScore].length; t++){
            if(valueList[relevanceScore][t].link === link){
                alreadyExists = true;
            }
        }

        if(!alreadyExists){
            valueList[relevanceScore].push({link: link, symbolicLink: symbolicLink});
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


chrome.runtime.sendMessage({
  links: links
});
