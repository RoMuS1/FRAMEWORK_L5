const Framework = require("./framework/Application.js");
const Router = require("./framework/Router.js");

const server = new Framework();
const port = 7777;

server.listen(port, () => console.log(`Server started on port ${port}`));

const userRouter = new Router();

userRouter.get("/users", (req, res) => {
  res.end(JSON.stringify({ id: 2006, name: "Romanchick", age: 18 }));
});

server.addRouter(userRouter);
