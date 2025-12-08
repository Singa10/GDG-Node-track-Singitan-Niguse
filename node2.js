const http = require('http');

let students = [];
let id = 1;

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
        return;
    }

    if (req.method === 'POST' && req.url === '/students') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = JSON.parse(body);
            const student = { id: id++, name: data.name };
            students.push(student);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(student));
        });
        return;
    }

    if (req.method === 'PUT' && req.url.startsWith('/students/')) {
        const studentId = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = JSON.parse(body);
            const student = students.find(s => s.id === studentId);
            if (student) {
                student.name = data.name;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(student));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Student not found');
            }
        });
        return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/students/')) {
        const studentId = parseInt(req.url.split('/')[2]);
        const index = students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            students.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Student deleted');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Student not found');
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid route');

});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
