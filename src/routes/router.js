const url = require('url');
const endpoints = require('./v1');

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  for (let route in endpoints) {
    const routeParts = route.split('/').filter(Boolean);
    const urlParts = path.split('/').filter(Boolean);
    
    if (routeParts.length !== urlParts.length) continue;
    
    let isMatch = true;
    let params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = urlParts[i];
      } else if (routeParts[i] !== urlParts[i]) {
        isMatch = false;
        break;
      }
    }
    
    if (isMatch) {
      req.params = params;
      req.query = parsedUrl.query;
      const methodHandler = endpoints[route][req.method];
      if (methodHandler) {
        return methodHandler(req, res);
      } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      }
    }
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Not Found");
}

module.exports = { handleRequest };
