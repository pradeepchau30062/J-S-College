import http from 'http';
import { Server } from 'socket.io';
import { app } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  await connectDb();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: env.clientUrl, credentials: true } });

  io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => socket.join(roomId));
    socket.on('chat-message', (payload) => io.to(payload.roomId).emit('chat-message', payload));
    socket.on('webrtc-signal', (payload) => io.to(payload.roomId).emit('webrtc-signal', payload));
  });

  server.listen(env.port, () => console.log(`Server listening on ${env.port}`));
};

start();
