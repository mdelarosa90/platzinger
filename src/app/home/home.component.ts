import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];
  query: string = '';
  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.listFriends();
    this.listUser();
  }

  public listUser() {
    this.authenticationService.getStatus().subscribe(status => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
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
      console.log(data);
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

}
