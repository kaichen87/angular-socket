import * as express from 'express';
import { Server, createServer } from 'http';
import * as socketIO from 'socket.io';

function bootstrap() {
  const app: express.Application = express();

  const port = 8099;

  const server: Server = createServer(app);

  const io: SocketIO.Server = socketIO(server);

  server.listen(port, () => {
    console.log('Running server on port %s', port);
  });

  io.on('connect', (socket: any) => {
    console.log('Connected client on port %s.', port);

    socket.on('message', (m: string) => {
      console.log('[server](message): %s', m);
      io.emit('message', `${m},server:${new Date().getTime()}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

bootstrap();
