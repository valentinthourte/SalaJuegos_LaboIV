import { Component, effect, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ChatMessage } from '../../../models/chat-message';
import { ChatService } from '../../../services/chat/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  protected messages: any[] = [];
  protected message: string = "";
  public chat = signal<ChatMessage[]>([]);

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  constructor(private chatService: ChatService, private loginService: LoginService) {
    this.chatService.getMessages();
    effect(() => {
      const chatList = this.chatService.chat();
      this.chat.set(chatList);
      setTimeout(() => this.scrollToBottom(), 100);
    });
    this.chat.set(this.chatService.chat());
  }
  ngOnInit() {

  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }

  isOwnMessage(msg: ChatMessage): any {
    return msg.sender == this.loginService.getUserEmail();
  }

  getUserEmail() {
    return this.loginService.getUserEmail();
  }

  saveMessage() {
    this.chatService.sendMessage(this.message, this.loginService.getUserEmail());
    this.message = "";
  }

}
