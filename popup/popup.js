const mainList = document.getElementById("mainList");

chrome.tabs.query(
    { currentWindow: true, active: true },
    //This function is async be careful!
    function (tabArray) {
        //Get the tabID of the current tab
        var tabID = tabArray[0].id;
        console.log(tabID);

        //Look up links in the link object
        chrome.runtime.sendMessage({tabID: tabID}, function(response) {
            //Wait for response from background script
            const links = response.links;
            //Loop over the entire links array
            for(i = 0; i < links.length; i++){
                const currentLink = links[i];                                   //Create a reference to the current link
                var a = document.createElement("a");                            //Create a link element that will be inserted into the list
                a.appendChild(document.createTextNode(currentLink));            //Insert the link text into the link element
                a.href = currentLink;                                           //Add the link attribute to the link element
                var li = document.createElement("li");                          //Create the list item element
                li.appendChild(a);                                              //Insert the link element into the list item element
                mainList.appendChild(li);                                       //Insert the list item element into the main list element
            }
        });
    }
);
