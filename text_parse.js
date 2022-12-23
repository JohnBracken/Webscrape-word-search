//Script to parse text from a scraped website.

//Event listener for button on the browser to parse text from a different scraped website.
document.getElementById("buttoned").addEventListener("click", findPhrase);


//Function to test that the browser can print a word that the user enters after clicking the button.    
function printText() {
    let word = prompt("Please enter a word:");
    let spaces = word.match(/^\s*$/);
    if (word === null) {
        return;  
    } else if (spaces === null) {
        document.getElementById("showWord").innerHTML = "Nice job, you selected " + word;
    } else {
        document.getElementById("showWord").innerHTML = "You didn't enter a word, try again...";
    }
}

//Function to find phrases from the scraped text containing a word entered by the user of the browser.
//The phrases give additional context as to how the word is being used.                   
function findPhrase() {

    //Word entered by user.
    let word = prompt("Please enter a word:");
    word = word.toLowerCase();                                                              
    let text_block = document.getElementById("showText").innerText;
    text_block = text_block.toLowerCase();
    let word_found = text_block.includes(word);
    let spaces = word.match(/^\s*$/);
    if (word === null) {
        return;
    } else if (spaces != null) {
        document.getElementById("showWord").innerHTML = "You didn't enter a word, try again...";
    } else if (word_found  === true) {

        //For found word, use regex to get the phrases around the word.
        let lower = new RegExp(/(?:\w+[.,;:!?\-_\'\"]*\s*[\'\"]*){0,5}/)
        let upper = new RegExp(/(?:[.,;:!?\-_\'\"]*\s*\w+[.:;,!?\-_\'\"]*){0,5}/)   
        let phrase = new RegExp(lower.source + word + upper.source, 'g');
        let phrase_text = Array.from(text_block.matchAll(phrase));
        let phrase_string = phrase_text.join('<br> <b>Next phrase found:</b>  ');
        document.getElementById("showWord").innerHTML = "<b>First phrase found around the word \'" + word + "\' :</b>  " + phrase_string;
    } else {
        document.getElementById("showWord").innerHTML = "Sorry, the word " + word + " was not found.";  
    }    
}
