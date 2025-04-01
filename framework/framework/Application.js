const http = require("http");
const EventEmitter = require("events");
const url = require("url");

class Framework {
  constructor() {
    this.server = this._createServer();
    this.emitter = new EventEmitter();
    this.middlewares = [];
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), async (req, res) => {
          req.params = this._extractParams(req.url, path);
          req.query = url.parse(req.url, true).query;
          
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            req.body = body ? JSON.parse(body) : {};
            
            let idx = 0;
            const next = () => {
              if (idx < this.middlewares.length) {
                this.middlewares[idx++](req, res, next);
              } else {
                endpoint[method](req, res);
              }
            };
            next();
          });
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      res.send = (data) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      };
      res.json = (data) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      };
      res.status = (code) => {
        res.writeHead(code);
        return res;
      };
      
      const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res);
      if (!emitted) {
        res.status(404).send("Not Found");
      }
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }

  _extractParams(reqUrl, route) {
    const reqSegments = reqUrl.split("/").filter(Boolean);
    const routeSegments = route.split("/").filter(Boolean);
    const params = {};
    
    if (reqSegments.length !== routeSegments.length) return params;
    
    routeSegments.forEach((seg, idx) => {
      if (seg.startsWith(":")) {
        params[seg.slice(1)] = reqSegments[idx];
      }
    });
    return params;
  }
}

module.exports = Framework;