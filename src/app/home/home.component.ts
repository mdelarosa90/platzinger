import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';
import { PresenceService } from '../presence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  closeResult: string;
  friends: User[];
  friendEmail: string = '';
  friendMessage: Text;
  query: string = '';
  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private requestService: RequestService,
    private presenceService: PresenceService

  ) {
  }

  ngOnInit() {
    this.listFriends();
    this.listUser();
    this.authenticationService.getIdToken();
  }

  public listUser() {
    this.authenticationService.getStatus().subscribe(status => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  public listFriends () {
     this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, error => {
      console.log(error);
    });
  }

  public logOut() {
    this.authenticationService.logOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log(error);
    });
  }

  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  sendRequest () {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      receiver_message: this.friendMessage,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request).then(() => {
      alert('Solicitud Enviada');
    }).catch(error => {
      alert('Hubo Error');
      console.log(error);
    });
  }

}
