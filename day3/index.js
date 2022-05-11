import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Backend is working");
});

server.listen(8000);
