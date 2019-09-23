//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir);
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const { stat } = require('fs')
const { join } = require('path')
const { promisify  } = require('util')
const readdirP = promisify(readdir)
const statP = promisify(stat)
const directories = ['outputMergeFile', 'outputNewMergeFile'];
let arrFiles = []
// let arrLoad = ['inputFreeIPTV', 'inputGitHub', 'inputOthers']
//joining path of directory 

//  async function loadData (folderName)  {
//     const directoryPath = path.join(__dirname, folderName);
//     //passsing directoryPath and callback function
//    await fs.readdir(directoryPath, function (err, files) {
//         //handling error
//         if (err) {
//             return console.log('Unable to scan directory: ' + err);
//         } 
//         //listing all files using forEach
//         files.forEach(function (file) {
//             // Do whatever you want to do with the file
//             console.log(file); 
//             arrFiles.push(file)
//         });
//     });

// }





async function rreaddir(dir, allFiles = []) {
    console.log('-----------------BEGIN READ ALL INPUT ----------------')
    const files = (await readdirP(dir)).map(f => join(dir, f))
    allFiles.push(...files)
    await Promise.all(
        files.map(
            async f => (await statP(f)).isDirectory() && rreaddir(f, allFiles)
        )
    )
    console.log('-----------------END READ ALL INPUT ----------------')
    return allFiles
}


async function loadFile(arrLoadData) {
    let arrPromise = []
    for (let i = 0; i < arrLoadData.length; i++) {
        arrPromise.push(rreaddir(arrLoadData[i], arrFiles))
    }
    return await Promise.all(arrPromise).then(() => {
        return Promise.resolve(arrFiles)
    })

}

async function readAllFile(arrLoad) {
    return await loadFile(arrLoad)
}


function writeErrLog(fileLog, err, fileName) {
    var now = new Date();
    var jsonFileFail = JSON.stringify(err);
    var line = `${fileName} : ${jsonFileFail} `;
    fs.appendFileSync(fileLog, now.toISOString() + ' ' + line + '\n');
}

function writeLog(fileLog, data) {
    var now = new Date();
    var jsonFile = JSON.stringify(data);
    var line = `${jsonFile} `;
    fs.appendFileSync(fileLog, '');
    fs.appendFileSync(fileLog, now.toISOString() + ' ' + line + '\n');
}

// https://stackoverflow.com/questions/27072866/how-to-remove-all-files-from-directory-without-removing-directory-in-node-js
async function deleteData(directories) {
    try {
        for (let i = 0; i < directories.length; i++) {
            let files = await readdir(directories[i])
            let unlinkPromises = files.map(filename => unlink(`${directories[i]}//${filename}`));
            await Promise.all(unlinkPromises)
        }
    } catch (e) {
        writeErrLog('error.log', e, 'utils.ks')
        console.log('Delete file error', e)
    }
}

module.exports = {
    readAllFile: readAllFile,
    writeErrLog: writeErrLog,
    writeLog: writeLog,
    deleteData: deleteData
}

