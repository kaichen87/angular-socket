import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://localhost:8099';

export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

export enum MessageType {
  MESSAGE = 'message',
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor() {}

  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: string): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => observer.next(data));
    });
  }

  public onEvent(event: SocketEvent): Observable<SocketEvent> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
