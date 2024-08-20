import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ChatMessage, MessageType } from '../models/chat.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = '';
  newMessage: string = '';
  messages: ChatMessage[] = [];
  isJoined: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.getMessageSubject().subscribe(message => {
      if (message.type === MessageType.JOIN) {
        this.messages.push({
          type: MessageType.CHAT,
          sender: 'Session',
          content: `${message.sender} a rejoint la discussion`
        });
      } else {
        this.messages.push(message);
      }
    });
  }

  sendMessage() {
    if (this.newMessage) {
      this.chatService.sendMessage({
        sender: this.username,
        content: this.newMessage,
        type: MessageType.CHAT
      });
      this.newMessage = '';
    }
  }

  joinChat() {
    if (this.username) {
      this.chatService.addUser({ sender: this.username, type: MessageType.JOIN });
      this.isJoined = true;
    }
  }
}
