const fs = require('fs');
const path = require('path');

class FileService {
    constructor() {
        this.dataDir = path.join(__dirname, '../data');
        this.filePath = path.join(this.dataDir, 'file.txt');

        // Ensure data directory exists
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    appendText(text) {
        fs.appendFileSync(this.filePath, text + '\n', { flag: 'a' });
    }

    readFile() {
        if (!fs.existsSync(this.filePath)) {
            return null;
        }
        return fs.readFileSync(this.filePath, 'utf8');
    }
}

module.exports = FileService;