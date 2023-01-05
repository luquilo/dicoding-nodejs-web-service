const http = require("http");
const { builtinModules } = require("module");
const port = 5000;
const host = "localhost";

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(JSON.stringify({
        "message" : "ini adalah homepage!"
      }))
    } else {
      response.statusCode = 400
      response.end(JSON.stringify({
        "message" : `halaman tidak dapat diakses dengan method ${method} request`
      }))
    }
    //todo logika bila url bernilai /
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(JSON.stringify({
        "message" : "ini adalah halaman about"
      }));
    } else if (method === "POST") {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(JSON.stringify({
          "message" : `halo ${name}, ini adalah halaman post!`
        }))
      });
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: "maaf permintaan tidak diketahui"
        })
      );
    }
  } else {
    response.statusCode = 400;
    response.end(JSON.stringify({
      "message" : "halaman tidak ditemukan!"
    }))
  }

  // if (method === "GET") {
  //   response.end('<h1>ini GET</h1>');
  // }

  // if (method === "POST") {
  //   let body = []

  //   request.on('data', (chunk) => {
  //       body.push(chunk)
  //   })

  //   request.on('end', () => {
  //       body = Buffer.concat(body).toString()
  //       const { name } = JSON.parse(body)
  //       response.end(`<h1>Halo ${name}!</h1>`)
  //   })
  // }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`server berjalan pada http://${host}:${port}`);
});
