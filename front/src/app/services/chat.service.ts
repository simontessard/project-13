import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient!: Client;
  private messageSubject = new Subject<any>();

  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000, // Reconnect after 5 seconds if the connection drops
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/topic/public', (message) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    };

    this.stompClient.activate(); // Start the WebSocket connection
  }

  sendMessage(message: any) {
    this.stompClient.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(message) });
  }

  addUser(user: any) {
    this.stompClient.publish({ destination: '/app/chat.addUser', body: JSON.stringify(user) });
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('Disconnected');
    }
  }
}
