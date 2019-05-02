import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { PresenceService } from '../presence.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input () uid: string;

  contact: User;

  constructor(
    private userService: UserService,
    private presenceService: PresenceService
  ) { }

  ngOnInit() {
    console.log(this.uid);
    this.listContactInfo();
  }

  public listContactInfo() {
    this.userService.getUserById(this.uid).valueChanges().subscribe((data: User) => {
      this.contact = data;
    }, error => {
      console.log(error);
    });
  }

}
