const http = require("http");
const port = 5000;
const host = "localhost";

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method } = request;

  if (method === "GET") {
    response.end("GET");
  }

  if (method === "POST") {
    response.end('POST');
  }

  if (method === "PUT") {
    response.end('PUT');
  }

  if (method === "DELETE") {
    response.end('DELETE');
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`server berjalan pada http://${host}:${port}`);
});
