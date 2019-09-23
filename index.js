var readAllData = require("./utils.js")
let arrInput = ['input1', 'input2']
const fs = require('mz/fs')
var jsonMerger = require("json-merger");
const {
    mergeAndReplace
} = require('./mergeFile')
async function processData() {

    let allFileInput1 = await readAllData.readAllFile(['input1'])
    console.log('allFileInput1', allFileInput1)
    await readAndProcessEachFile(allFileInput1)
}

async function readAndProcessEachFile(arrFile) {
    try {
        for (var i = 0; i < arrFile.length; i++) {
            let currentName = arrFile[i];
            // load file from input1 folder

            let file1Data = await fs.readFile(currentName, 'utf8');
            // load file from input2 folder
            let file2Data = await fs.readFile(currentName.replace('input1', 'input2'), 'utf8');
            let obj = JSON.parse(file1Data).concat(JSON.parse(file2Data))
            console.log('obj', (obj))
            // let dataMerge = mergeData(eval((obj)),'label')
            let dataMerge = mergeData(obj,'label')
             console.log('dataMerge', dataMerge)
             let writeFiles = await fs.writeFile(currentName.replace('input1', 'output'), JSON.stringify(dataMerge))
            // console.log('file1Data', JSON.parse(file1Data))
            // console.log('file2Data', JSON.parse(file2Data))
        }

    } catch (err) {
        console.error('error link', err)
    }
}

function mergeData(arr, atr) {
    console.log(typeof arr,'Is Array', Array.isArray(arr))
    const result = [];
    const map = new Map();
    for (const item of arr) {
        if (!map.has(item[atr])) {
            map.set(item[atr], true); // set any value to Map
            result.push(item);
        } else {
            let index = result.findIndex(x => x[atr] === item[atr]);
            result[index] = item
        }
    }
    return result;
}

processData()