import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private angularFireDataBase: AngularFireDatabase) { }

    createConversation (conversation) {
      return this.angularFireDataBase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
    }

    getConversation(uid) {
      return this.angularFireDataBase.list('conversations/' + uid);
    }

    editConversation (conversation) {
      return this.angularFireDataBase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
    }

    setImage(conversation, imagen) {
      return this.angularFireDataBase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(imagen);
    }
}


