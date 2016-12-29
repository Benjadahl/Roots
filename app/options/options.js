function arrayToString(input){
    var output = JSON.stringify(input);
    output = output.substring(1, output.length);
    output = output.substring(0, output.length - 1);
    output = output.replace(/"/g,'');
    return output;
}

const bannedKeywordsElement = document.getElementById("bannedKeywords");

chrome.storage.sync.get("bannedKeywords", function(data){
    bannedKeywordsElement.value = arrayToString(data.bannedKeywords);
});

const saveButtonElement = document.getElementById("saveButton");
const errorText = document.getElementById("error");

saveButtonElement.addEventListener("click", function(){
    const valueString = bannedKeywordsElement.value;
    if (!valueString.includes('"')){
        var newValue = valueString.split(",");
        if(newValue[0] === ""){
            newValue = [];
        }
        chrome.storage.sync.set({"bannedKeywords": newValue});
        errorText.innerHTML = "."
        errorText.style.visibility = "hidden";
    } else {
        errorText.innerHTML = "You cannot use quotes in your banned keywords"
        errorText.style.visibility = "visible";
    }
});

const defaultButtonElement = document.getElementById("defaultButton");

defaultButtonElement.addEventListener("click", function(){
    const bannedKeywords = [
        //Technical bans
        "javascript:","#", "?",
        //Banned sites
        "goo.gl","bit.ly","adf.ly","youtube.com","imgur"
    ];
    bannedKeywordsElement.value = arrayToString(bannedKeywords);
});
