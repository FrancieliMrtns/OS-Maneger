const app = require('./app');
const debug = require('debug')('node:server'); 
const http = require('http'); 

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);
console.log(`Servidor rodando na porta ${port} ...`);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    else if (port >= 0) {
        return port;
    }

    else {
        return false;
    }
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        `Pipe ${port}` :
        `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        
        default:
            throw error;
            break;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'?
        `pipe ${addr}` :
        `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
