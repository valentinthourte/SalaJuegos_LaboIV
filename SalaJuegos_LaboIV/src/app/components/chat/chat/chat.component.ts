import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('containerDos') containerDos!: ElementRef;
  constructor(private chatService: ChatService, private loginService: LoginService) {

  }
  ngOnInit() {
    this.chatService.getMessages()
    .then((success) => {
      if (success) {
        this.messages = success.data!
      }
    })
  }

  isOwnMessage(msg: ChatMessage): any {
    return msg.sender == this.loginService.getUserEmail();
  }

  getUserEmail() {
    return this.loginService.getUserEmail();
  }


  saveMessage() {
    this.chatService.sendMessage(this.message);
    this.message = "";
  }

}
