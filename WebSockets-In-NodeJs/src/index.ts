// import WebSocket, { WebSocketServer } from 'ws';
// import http from 'http';

// const server = http.createServer((request, response) => {
//     console.log(`${new Date()} Received request for ${request.url}`);
//     response.end("Hi there");
// });

// const wss = new WebSocketServer({ server });

// let userCount = 0;

// wss.on('connection', (socket) => {
//     console.log("UserCount", ++userCount);
//     socket.on('error', (err) => console.error(err) ); // if error happens
//     socket.on('message', (data, isBinary) => {
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data, { binary: isBinary });
//             }
//         });
//     });
//     socket.send('Hello! Message From Server!!');
// });

// server.listen(8080, () => {
//     console.log(`${new Date()} Server is listening on port 8080`);
// });


import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});