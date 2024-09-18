const http = require('http');
const fs = require('fs');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/enviar') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = queryString.parse(body);
      const { firstName, lastName, phone, comments } = postData;
      const data = `Nombre: ${firstName} ${lastName}\nCelular: ${phone}\nComentarios: ${comments}\n`;

      fs.appendFile('\download\contacto.txt', data, 'utf8', (err) => {
        if (err) {
          res.writeHead(500);
          res.end('Error al guardar los datos');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Datos guardados correctamente');
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});


