var readAllData = require("./utils.js")
let arrInput = ['input1', 'input2']
const fs = require('mz/fs')
var jsonMerger = require("json-merger");
const { mergeAndReplace }  = require('./mergeFile')
async function processData() {

    let allFileInput1 = await readAllData.readAllFile(['input1'])
    console.log('allFileInput1', allFileInput1)
    await readAndProcessEachFile(allFileInput1)
}

 async function readAndProcessEachFile(arrFile) {
     try {
         for ( var i = 0 ; i <arrFile.length; i++ ) {
             let currentName = arrFile[i];
             // load file from input1 folder
           
             let file1Data = await fs.readFile(currentName, 'utf8');
             // load file from input2 folder
             let file2Data = await fs.readFile(currentName.replace('input1','input2'), 'utf8');
             let obj = JSON.parse(file1Data).concat(JSON.parse(file2Data))
             let mergeFileData = jsonMerger.mergeObject(obj)
            //  let mergeFileData = jsonMerger.mergeFiles([currentName, currentName.replace('input1', 'input2')]);
             console.log('obj', obj)
             console.log('mergeFileData', mergeFileData)
            //  let writeFiles = await fs.writeFile(currentName.replace('input1', 'output'), JSON.stringify(mergeFileData))
             console.log('file1Data', JSON.parse(file1Data))
             console.log('file2Data', JSON.parse(file2Data))
            //  console.log('writeFiles', writeFiles)
          }
        
     }
     catch (err) { console.error('error link', err) }
}


// Merge second object into first
function merge(set1, set2) {
    for (var key in set2) {
        if (set2.hasOwnProperty(key))
            set1[key] = set2[key]
    }
    return set1
}

// merge(set1, set2)

// Create set from array
function setify(array) {
    var result = {}
    for (var item in array) {
        if (array.hasOwnProperty(item))
            result[array[item]] = true
    }
    return result
}

processData() 