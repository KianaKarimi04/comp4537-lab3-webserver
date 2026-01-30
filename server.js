const http = require('http');
const url = require('url');

const Utils = require('./modules/utils');
const Messages = require('./lang/en');

class Server {
    constructor() {
        this.Utils = new Utils();
    }

    start() {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);

            if (parsedUrl.pathname === '/COMP4537/labs/3/getDate') {
                const name = parsedUrl.query.name || 'Guest';
                const date = this.Utils.getDate();

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(Messages.greeting(name, date));
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        });

        server.listen(3001, () => {
            console.log('Server running...');
        });
    }
}

const server = new Server();
server.start();