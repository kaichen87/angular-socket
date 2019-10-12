import { Component } from '@angular/core';
import { SocketService, SocketEvent } from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-socket-client';
  messages: string[] = [];

  constructor(private socketService: SocketService) {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });

    this.socketService.onEvent(SocketEvent.CONNECT).subscribe(() => {
      console.log('connected');
    });

    this.socketService.onEvent(SocketEvent.DISCONNECT).subscribe(() => {
      console.log('disconnected');
    });
  }

  public sendMessage(): void {
    this.socketService.send(`client:${new Date().getTime()}`);
  }
}
