import { Component, OnInit, Input } from '@angular/core';
import { PresenceService } from '../presence.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() uid;

  presence$;
  constructor(private presenceService: PresenceService) { }

  ngOnInit() {
    this.presence$ = this.presenceService.getPresence(this.uid);
  }

}
