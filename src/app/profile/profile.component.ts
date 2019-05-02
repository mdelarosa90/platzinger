import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any = '';
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private fireBaseStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    this.authenticationService.getStatus().subscribe(status => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  public saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.fireBaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then(result => {
        this.picture = this.fireBaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe(p => {
          this.userService.setAvatar(p, this.user.uid).then(() => {
            alert('avatar subido correctamente');
          }).catch(error => {
            alert('Hubo un error al tratar de subir la imagen');
            console.log(error);
          });
        });
      }).catch(error => {
        console.log(error);
      });
    } else {
      this.userService.editUser(this.user).then(() => {
        alert('Cambios Guardados');
      }).catch(error => {
        alert('Hubo Un error');
        console.log(error);
      });
    }
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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

}
