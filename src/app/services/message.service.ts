import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private storage: AngularFireStorage) { }

    createMessage (message) {
      return this.angularFireDataBase.object('message/' + message.uid).set(message);
    }

    getMessage(uid) {
      return this.angularFireDataBase.list('message/' + uid);
    }

    editMessage (message) {
      return this.angularFireDataBase.object('message/' + message.uid).set(message);
    }

    setImage(message, imagen) {
      return this.angularFireDataBase.object('message/' + message.uid + '/avatar' ).set(imagen);
    }

    uploadImage(folder: string, elementId: string): Promise<string> {
      return new Promise((complete, bad) => {
        const control = document.getElementById(`${elementId}`)
        if (control.getElementsByTagName('img')) {
          const currentPictureId = Date.now();
          const img = control.getElementsByTagName('img').item(0).getAttributeNode('src').value;
          const ref = this.storage.ref(`${folder}/${currentPictureId}/${currentPictureId}.jpg`)
          const task = ref.putString(`${img}`, 'data_url');
          task.snapshotChanges()
             .pipe(
               finalize(async() => {
                 try {
                   const url = await ref.getDownloadURL().toPromise();
                   complete(url)
                 } catch (error) {
                   bad(error)
                 }
               })
             )
             .subscribe()
        }
      })
    }
}
