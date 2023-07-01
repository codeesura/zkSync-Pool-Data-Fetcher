const fs = require('fs');
const path = require('path');

const currentDirname = __dirname;

function getJsonFile(filePath) {
    const fileContent = fs.readFileSync(path.join(currentDirname, filePath), 'utf8');
    return JSON.parse(fileContent);
}

function writeJsonFile(filePath, data) {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(path.join(currentDirname, filePath), content, 'utf8');
}

module.exports = {
    getJsonFile,
    writeJsonFile
};