import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {

  public chat = signal<ChatMessage[]>([]);
  
  constructor(private supabase: SupabaseService) { }


  ngOnInit(): void {

    this.subscribeToMessages();
  }
  
  getMessages() {
    this.supabase.getMessages()
    .then((res: ChatMessage[] | null) => {
      console.log(res);
      
      if (res)
        this.chat.set(res)
    });
  }
  

  sendMessage(message: string, sender: string) {
    this.supabase.sendMessage(message, sender)
    .then(() => {
      this.getMessages();
    });
  }

  getChat(): any {
    const channels = this.supabase.getChatChannel();
  }

  
  subscribeToMessages() {
    this.supabase.getChatChannel()
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: this.supabase.chatTableName() },
      async (payload) => {
        const message = payload.new as ChatMessage;
        
        this.addNewMessage(message);
      }
    )
    .subscribe();
  }
  addNewMessage(message: ChatMessage) {
    let messages = this.chat();
    this.chat.set([...messages, message]);
  }

}
