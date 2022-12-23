//Script to load text from a scraped website onto the browser.

//To get this to work, need to run a local server for the webpage to be able to 
//display the data locally.
//  $python3 -m http.server

document.getElementById("load_text").addEventListener("click", fetchText);

function fetchText(){
fetch("./webpage_output.json")
    .then(response => response.json())
    .then(data => {
            document.getElementById("showText").innerText = data.siteBodyText
     })
}
