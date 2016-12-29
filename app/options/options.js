const bannedKeywordsElement = document.getElementById("bannedKeywords");

chrome.storage.sync.get("bannedKeywords", function(data){
    bannedKeywordsElement.value = JSON.stringify(data.bannedKeywords);
});

const saveButtonElement = document.getElementById("saveButton");

saveButtonElement.addEventListener("click", function(){
    const newValue = JSON.parse(bannedKeywordsElement.value);
    chrome.storage.sync.set({"bannedKeywords": newValue});
});
