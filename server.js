const http = require("http");
const { builtinModules } = require("module");
const port = 5000;
const host = "localhost";

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>ini adalah homepage</h1>");
    } else {
      response.end(`responds tidak ditemukan dengan method ${method} request`);
    }
    //todo logika bila url bernilai /
  } else if (url === "/about") {

      if (method === "GET") {
        response.end('<h1>ini adalah halaman about</h1>')
      } 
      
      else if (method === "POST") {
        let body = []
        request.on('data', (chunk) => {
          body.push(chunk)
        })
        request.on('end', () => {
          body = Buffer.concat(body).toString();
          const {name} = JSON.parse(body);
          response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        })
      }
      
    
      else {
        response.end(
          `<h1>halaman tidak dapat diakses menggunakan method ${method} request</h1>`
      );
    }
  } else {
    response.end("<h1>halaman tidak ditemukan!</h1>");
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
