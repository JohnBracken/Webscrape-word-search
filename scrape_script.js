// node and npm need to be installed  installed for script to work.
// Install puppeteer package for webscraping.

// npm init -y     -creates empty package json
// npm install puppeteer

//To get element from webpage, right click on element and copy xpath

//Run script from terminal:  $ node scrape_script.js


//Puppeteer library
var fs = require('fs')
var pt= require('puppeteer');

//Website to scrape
var website = 'johnbracken.github.io'

//Function to get body text from a website.
async function getText(web_page){
   //launch browser in headless mode
   const browser = await pt.launch();

   //browser new page
   const page = await browser.newPage();

   //launch URL
   await page.goto('https://' + web_page);

   //identify element
   const f = await page.$("body");

   //obtain text as string get rind of spaces greater than 3 chars long and keep newlines.
   var text = await (await f.getProperty('textContent')).jsonValue();
   text = text.replace(/ {3,}/g,"");

   //Create a json object of the website body text.
   var webtestObj = {"siteBodyText": text };

   //Stringify the json object for export to a json file and then close the browser.
   var web_string = JSON.stringify(webtestObj);

   //Write scraped text from website to a JSON file.
   fs.writeFile('./webpage_output.json', web_string, 'utf8', function(err) {
      if (err){ 
          throw err;
      } else {
          console.log("Site found and scrape complete...");
      }
   }
   );


   await browser.close();
}

//Call function to scrape website
getText(website);

