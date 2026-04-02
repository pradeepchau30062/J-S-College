import http from 'http';
import { Server } from 'socket.io';
import { app } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { ChatMessage } from './modules/chat/chat.model.js';

const onlineUsers = new Map();

const start = async () => {
  await connectDb();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: env.clientUrl, credentials: true } });

  io.on('connection', (socket) => {
    socket.on('presence:online', ({ userId }) => {
      onlineUsers.set(userId, socket.id);
      io.emit('presence:update', { userId, status: 'online' });
    });

    socket.on('join-room', (roomId) => socket.join(roomId));

    socket.on('chat-message', async (payload) => {
      const saved = await ChatMessage.create(payload);
      io.to(payload.roomId).emit('chat-message', { ...payload, _id: saved._id, createdAt: saved.createdAt });
    });

    socket.on('webrtc-signal', (payload) => io.to(payload.roomId).emit('webrtc-signal', payload));

    socket.on('disconnect', () => {
      const userEntry = [...onlineUsers.entries()].find(([, id]) => id === socket.id);
      if (userEntry) {
        onlineUsers.delete(userEntry[0]);
        io.emit('presence:update', { userId: userEntry[0], status: 'offline' });
      }
    });
  });

  server.listen(env.port, () => console.log(`Server listening on ${env.port}`));
};

start();
