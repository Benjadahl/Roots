var linkNodes = document.links;
var links = [];
var valueList = [];
const domain = getDomain(window.location.href);

//Configurations
const slashWeight = 5;
const sameDomainWeight = 30;

/*Get the banned keywords from the Chrome storage, this function is asynchrounos
Everything is therefore in the callback of this function*/
chrome.storage.sync.get("bannedKeywords", function(data){
    var bannedKeywords = data.bannedKeywords;

    /*A loop to go through all of the links in the page
    It will check if the links contains banned words, and give them a score
    It will also shorten them if they are from the same domain*/
    for (i = 0; i < linkNodes.length; i++){
        var link = linkNodes[i].href;
        var symbolicLink = link;
        var containsBanned = false;

        //Check if the link contains ANY of the banned keywords
        for(t = 0; t < bannedKeywords.length; t++){
            if(link.includes(bannedKeywords[t])){
                containsBanned = true;
            }
        }

        //This will only be run if it did not contain any banned keywords
        if(!containsBanned){
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

            //Set up categories for the different scores of relevance
            if(typeof valueList[relevanceScore] !== "object"){
                valueList[relevanceScore] = [];
            }

            //Check if the link already has a dedicated object in the category
            var alreadyExists = false;
            for(t = 0; t < valueList[relevanceScore].length; t++){
                if(valueList[relevanceScore][t].link === link){
                    alreadyExists = true;
                }
            }

            //If it does not, push it to the list
            if(!alreadyExists){
                valueList[relevanceScore].push({link: link, symbolicLink: symbolicLink});
            }
        }
    }

    //Loop through all the categories, from the low scores to the high
    //Push all of it to an array, this way they will be ordered
    for (i = 0; i < valueList.length; i++){
        const valueCategory = valueList[i];
        if(typeof valueCategory !== "undefined"){
            for (t = 0; t < valueCategory.length; t++){
                links.push(valueCategory[t]);
            }
        }
    }

    //Send the ordered array of relevant links to the background page
    chrome.runtime.sendMessage({
      links: links
    });
});
