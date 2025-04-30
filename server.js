const http = require('http');
const { handleRequest } = require('./src/routes/router');
const bodyParser = require('./src/middlewares/bodyParser');

const port = 7777;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    bodyParser(req, res, () => {
      handleRequest(req, res);
    });
  } else {
    handleRequest(req, res);
  }
});

server.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
