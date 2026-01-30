const fs = require('fs');
const path = require('path');

class FileService {
    constructor() {
        this.filePath = path.join(__dirname, '../data/file.txt');
    }

    appendText(text) {
        fs.appendFileSync(this.filePath, text + '\n');
    }

    readFile() {
        if (!fs.existsSync(this.filePath)) {
            return null;
        }
        return fs.readFileSync(this.filePath, 'utf8');
    }
}

module.exports = FileService;