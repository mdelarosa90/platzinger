import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend: User;
  user: User;
  conversation: any[];
  conversation_uid: string;
  textMessage: string;
  shake: boolean = false;
  picture: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showImage: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private conversationService: ConversationService,
    private fireBaseStorage: AngularFireStorage
  ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
  }

  ngOnInit() {
    this.getFriend();
    this.listUser();
  }

  public getFriend () {

    this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
      console.log('user', data);
      this.friend = data;
    }, error => {
      console.log(error);
    });
  }

  public listUser() {
    this.authenticationService.getStatus().subscribe(status => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        const ids = [this.user.uid, this.friend.uid].sort();
        this.conversation_uid = ids.join();
        this.getMessages();
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  public sendMessage() {
    const message =  {
      uid: this.conversation_uid,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }
  public sendZumbido() {
    const message =  {
      uid: this.conversation_uid,
      timestamp: Date.now(),
      text: 'ha enviado un zumbido',
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido();
  }

  public doZumbido() {
    const audio = new Audio ('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.showImage = true;
  }
  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  public imageLoaded() {
    // show cropper
  }
  public loadImageFailed() {
    // show message
  }

  public sendImage() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.fireBaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then(result => {
        this.picture = this.fireBaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        console.log (this.picture);
        this.picture.subscribe(p => {
        const message = {
             uid: this.conversation_uid,
             timestamp: Date.now(),
             text: p,
             sender: this.user.uid,
             receiver: this.friend.uid,
             type: 'image'
           };
           this.conversationService.createConversation(message).then(() => {}).catch(error => {
             alert('Hubo Un Error');
             console.log(error);
           });
        });
      }).catch(error => {
         console.log('Error Picture', error);
      });
     }
     this.showImage = false;
  }

  public getMessages() {
    this.conversationService.getConversation(this.conversation_uid).valueChanges().subscribe(data => {
      this.conversation = data;
      this.conversation.forEach(message => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type = 'text') {
            const audio = new Audio('./assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type = 'zumbido') {
            this.doZumbido();
          } else if (message.type = 'image') {
            const audio = new Audio ('./assets/sound/new_message.m4a');
            audio.play();
          }
        }
      });
    }, error => {
      console.log (error);
    });
  }

  public getUserNickById (id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }


}
