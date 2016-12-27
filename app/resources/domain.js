/*
    This function gets a URL and then identifies the domain name in it

    INPUT: WEBSITE URL
    OUTPUT: WEBSITE DOMAIN
*/

function getDomain (URL, includeProtocol = false) {
    var domain = "";
    var domainMode = false;
    let protocolEnd;
    URL = URL.toString();
    for (var c in URL){
        if(domainMode && URL[c] === "/"){
            domainMode = false;
            return domain;
        }
        if(domainMode){
            domain = domain + URL[c];
        }
        if(URL[c] === "/" && URL[c-1] === "/"){
            domainMode = true;
            protocolEnd = parseInt(c) + 1;
        }
    }
    if(includeProtocol){
        return URL.substring(0, protocolEnd) + domain;
    }
}
