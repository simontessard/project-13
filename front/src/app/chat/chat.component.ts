// src/app/components/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  username: string = '';
  newMessage: string = '';
  messages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.getMessageSubject().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage) {
      this.chatService.sendMessage({
        sender: this.username,
        content: this.newMessage,
        type: 'CHAT',
      });
      this.newMessage = '';
    }
  }

  joinChat() {
    if (this.username) {
      this.chatService.addUser({ sender: this.username, type: 'JOIN' });
    }
  }
}
