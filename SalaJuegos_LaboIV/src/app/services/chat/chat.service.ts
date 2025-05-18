import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';
import { SupabaseService } from '../supabase/supabase.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chat = signal<ChatMessage[]>([]);
  private channel: RealtimeChannel | null = null;
  constructor(private supabase: SupabaseService) { }
  
  async getMessages() {
    return await this.supabase.getMessages();
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

  
  subscribeToMessages(onNewMessage: (msg: ChatMessage) => void): RealtimeChannel{
    this.channel = this.supabase.channel('messages-channel')
    .on('postgres_changes',{
      event: 'INSERT',
      schema: 'public',
      table: 'chat-messages'
    }, (payload) =>{
      const newMessage = payload.new as ChatMessage;
      onNewMessage(newMessage);
    }).subscribe((status) =>{
      console.log('Realtime subscription status:', status);
    });

    return this.channel!;
  }


  addNewMessage(message: ChatMessage) {
    let messages = this.chat();
    this.chat.set([...messages, message]);
  }
  
}
