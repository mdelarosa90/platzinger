import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor( private afAuth: AngularFireAuth,
  private db: AngularFireDatabase) {
    console.log('presence');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
  }

  getPresence(uid: string) {
    return this.db.object(`users/${uid}`).valueChanges();
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`users/${user.uid}`).update({ status, timestamp: this.timestamp});
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  updateOnUser() {
    const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    return this.afAuth.authState.pipe(
      switchMap(user => user ? connection : of ('offline')),
      tap(status => this.setPresence(status))
    )
  }

  updateOnAway() {
    document['onvisibilitychange'] = (e) => {
      console.log(e);
      if (document.visibilityState === 'hidden'){
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    }
  }

  async signOut() {
    await this.setPresence('offline');
    await this.afAuth.auth.signOut();
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`users/${user.uid}`).query.ref.onDisconnect()
          .update({
            status: 'offline',
            timestamp: this.timestamp
          })
        }
      })
    )
  }

}
