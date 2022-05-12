// import http from "http";

// const server = http.createServer((req, res) => {
//   switch (req.url) {
//     case "/books":
//       if (req.method == "GET") {
//       }
//       if (req.method == "POST") {
//         //
//       }
//       console.log(req.method);
//       res.writeHead(200);
//       res.end("Book");
//       break;

//     case "/others":
//       res.writeHead(200);
//       res.end("OThers is working");
//       break;

//     default:
//       res.writeHead(404);
//       res.end("Backend is working");
//   }
// });

// server.listen(8000, () => {
//   console.log("server has started !!");
// // });

// import chalk from "chalk";

// console.log(chalk.bgCyan("Hello there"));

import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

logger.info({
  level: "warning",
  message: "database has crashed",
});
