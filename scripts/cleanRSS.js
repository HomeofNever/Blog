// Workround: https://github.com/saberland/saber/issues/537 
// Ganna find sometime fixing it lol
const fs = require('fs');
const path = require('path');
const readFile = async (filePath) => fs.promises.readFile(filePath, { encoding: 'utf8' });
const writeFile = async (filePath, data) => fs.promises.writeFile(filePath, data, { encoding: 'utf8' });
const RemoveInvalidXMLChars = (text) => {
    const _invalidXMLChars = /(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFEFF\uFFFE\uFFFF]/
    if (!text) return "";
    return text.replace(_invalidXMLChars, "");
}

const xmlPath = path.resolve(__dirname, '..', 'public/feed/atom.xml');

module.exports = async () => {
        let formatted = await readFile(xmlPath);
        formatted = await RemoveInvalidXMLChars(formatted);
        return writeFile(xmlPath, formatted);
}