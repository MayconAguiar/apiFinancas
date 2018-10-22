'use strict'

const express = require('express');
const app = express();
const https = require('https');

const router = express.Router();

var route = router.get('/', (requ, res, next) => {
     res.status(200).send({
         title: 'Node Store API',
         version: '0.0.1'
     });
});

var routeAcoes = router.get('/Consulte', (requ, res, next) => {        

    const options = {
        hostname: 'br.advfn.com',
        port: 443,
        path: '/bolsa-de-valores/bovespa/petrobras-PETR4/cotacao',
        method: 'GET'
      };
      
      const req = https.request(options, (resinterno) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
      
        resinterno.on('data', (d) => {
          const teste = process.stdout.write(d);
          res.status(200).send(teste);
        });
      });
      
      req.on('error', (e) => {
        console.error(e);
      });
      req.end();
      
    // https.get('https://br.advfn.com/bolsa-de-valores/bovespa/petrobras-PETR4/cotacao', (res) => {
    //     const { statusCode } = res;
    //     const contentType = res.headers['content-type'];
      
    //     let error;
    //     if (statusCode !== 200) {
    //       error = new Error('Request Failed.\n' +
    //                         `Status Code: ${statusCode}`);
    //     } else if (!/^application\/json/.test(contentType)) {
    //       error = new Error('Invalid content-type.\n' +
    //                         `Expected application/json but received ${contentType}`);
    //     }
    //     if (error) {
    //       console.error(error.message);
    //       // consume response data to free up memory
    //       res.resume();
    //       return;
    //     }
      
    //     res.setEncoding('utf8');
    //     let rawData = '';
    //     res.on('data', (chunk) => { rawData += chunk; });
    //     res.on('end', () => {
    //       try {
    //         const parsedData = JSON.parse(rawData);
    //         console.log(parsedData);
    //       } catch (e) {
    //         console.error(e.message);
    //       }
    //     });
    //   }).on('error', (e) => {
    //     console.error(`Got error: ${e.message}`);
    //   });
});

app.use('/', route);
app.use('/Consulte', routeAcoes);

module.exports = app;