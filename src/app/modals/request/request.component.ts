import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { RequestService } from '../../services/request.service';
import { User } from '../../interfaces/user';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel, OnInit  {

  scope: any;
  currentRequest: any;
  shouldAdd: string = 'yes';
  user: User;

  constructor(
    public dialogService: DialogService,
    private userService: UserService,
    private requestService: RequestService
  ) {
    super(dialogService);
  }

  ngOnInit () {
    this.listRequestUserSender();
  }

  public listRequestUserSender() {
    if (this.currentRequest) {
      this.userService.getUserById(this.currentRequest.sender).valueChanges().subscribe((user: User) => {
        this.user = user;
      }, error => {
        console.log(error);
      });
    }
  }

  public accept() {
    if (this.shouldAdd == 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted').then(data => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud Aceptada con éxito');
        })
      }).catch(error => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'no') {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected').then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'later') {
      this.requestService.setRequestStatus(this.currentRequest, 'decide_later').then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }
  }


}
