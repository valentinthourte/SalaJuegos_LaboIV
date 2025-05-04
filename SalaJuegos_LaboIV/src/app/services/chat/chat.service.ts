import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private http: HttpClient) { }
  
  getMessages() {
    const url = "";
    return this.http.get<ChatMessage[]>(url);
  }

}
