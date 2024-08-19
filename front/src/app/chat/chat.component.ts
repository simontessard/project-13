import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ChatMessage, MessageType } from '../models/chat.model';  // Assurez-vous que ce modèle est défini pour représenter les types de messages

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = '';
  newMessage: string = '';
  messages: ChatMessage[] = [];  // Assurez-vous que `ChatMessage` est le bon type pour vos messages
  isJoined: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.getMessageSubject().subscribe(message => {
      this.messages.push(message);

      // Vérifie si le message est de type 'JOIN' pour afficher un message spécifique
      if (message.type === MessageType.JOIN) {
        this.messages.push({
          type: MessageType.CHAT,
          sender: 'Session',
          content: `${message.sender} a rejoint la discussion`
        });
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
