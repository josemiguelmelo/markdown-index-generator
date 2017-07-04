#!/usr/bin/env node
const fs = require('fs');

if(process.argv.length != 4)
    return console.log("Parameters error: node generate-index.js <doc_folder> <index_file>");

const docsFolder = (process.argv[2] + "/").replace("//", "/");
const indexFile = docsFolder + process.argv[3];

var filesList = [];

fs.readdirSync(docsFolder).forEach(file => {
    if(file.match(/.\.md/)) filesList.push(file);
});

var tableOfContentsString = createTableOfContentsString();
saveTableOfContentsStringToFile(tableOfContentsString);

function createTableOfContentsString(){
    var tableOfContentsString = "## Table of Contents\n\n";
    var numeration = 1;

    filesList.forEach(file => {
        if(file == "index.md") return;

        subString = createSubTitles(docsFolder + file);

        file = file.replace(".md", "");

        tableOfContentsString += numeration + ". ["
        + capitalizeFirstLetter(file.replace("_", " ")) +
        "](/" + file + ")" + "\n" +
        subString;

        numeration++;
    });

    return tableOfContentsString;
}

function createSubTitles(file, callback){
    var subTitlesToC = "";
    var childsCounter = 0;

    fileContent = fs.readFileSync(file, "utf8");

    file = file.replace(".md", "");
    file = file.replace(docsFolder, "");

    var numCard = "#";
    var tabs = "";

    while(childsCounter < 1) {
        var regExp = new RegExp("[^#]" + numCard + " .*", "g");
        var titles = fileContent.match(regExp);

        if(titles == null){
            numCard += "#";
            continue;
        }

        if(titles != null) {
            childsCounter++;
            tabs += "\t";
        }

        var counter = 1;

        titles.forEach(title => {
            title = title.replace("\n", "");
            title = title.replace(numCard + " ", "");
            title = title.replace(numCard, "");
            title = "[" + title + "](" + file + "/#" + title.replace(new RegExp(" ", "g"), "_").toLowerCase() + ")";
            subTitlesToC += tabs + counter + ". " + title + "\n";
            counter++;
        });

        numCard += "#"
    }

    return subTitlesToC;
}

function saveTableOfContentsStringToFile(ToCString){
    fs.readFile(indexFile, 'utf8', (err, fileContent) => {
        var regExp = /## Table of Contents\n\n(\t*[0-9]*\. .*\n)*/;

        if(regExp.test(fileContent))
            fileContent = fileContent.replace(regExp, ToCString);
        else
            fileContent += "\n" + ToCString;

        console.log(ToCString);

        fs.writeFile(indexFile, fileContent, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The table of content was generated!");
        });
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
