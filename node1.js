const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        res.end('Welcome to the Home Page');
    }

    else if (req.url === '/info' && req.method === 'GET') {
        res.end('This is the information page');
    }

    else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => res.end(body));
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }

});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
