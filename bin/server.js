'use strict'

const app = require('../src/app');
const debug = require('debug')('nodestr:server');
// require com aspas simples busca da pastas node modules
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('Api rodando na porta ' + port);

// funcão tirada do node Express
// Normaliza a porta disponível
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// funcão tirada do node Express
// tratar algum possível erro
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 
    'Pipe ' + port :
    'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}