const http = require("http");
const port = 5000;
const host = "localhost";

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method } = request;

  if (method === "GET") {
    response.end('<h1>ini GET</h1>');
  }

  if (method === "POST") {
    let body = []

    request.on('data', (chunk) => {
        body.push(chunk)
    })

    request.on('end', () => {
        body = Buffer.concat(body).toString()
        const { name } = JSON.parse(body)
        response.end(`<h1>Halo ${name}!</h1>`)
    })
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`server berjalan pada http://${host}:${port}`);
});
