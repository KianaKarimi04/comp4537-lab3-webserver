const http = require('http');
const url = require('url');

const Utils = require('./modules/utils');
const Messages = require('./lang/en');
const FileService = require('./modules/fileService');

class Server {
    constructor() {
        this.Utils = new Utils();
        this.fileService = new FileService();
    }

    start() {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);

            // PART B
            if (parsedUrl.pathname === '/COMP4537/labs/3/getDate') {
                const name = parsedUrl.query.name || 'Guest';
                const date = this.Utils.getDate();

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(Messages.greeting(name, date));
            }

            // C.1 — writeFile
            else if (parsedUrl.pathname === '/COMP4537/labs/3/writeFile') {
                const text = parsedUrl.query.text || '';
                this.fileService.append(text);

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Text appended successfully');
            }

            // C.2 — readFile
            else if (parsedUrl.pathname.startsWith('/COMP4537/labs/3/readFile')) {
                const content = this.fileService.read();

                if (content === null) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 File not found: file.txt');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(content);
                }
            }

            else {
                res.writeHead(404);
                res.end('Not Found');
            }
        });

        const PORT = process.env.PORT || 3002;
        server.listen(PORT, () => {
            console.log('Server running...');
        });
    }
}

const server = new Server();
server.start();