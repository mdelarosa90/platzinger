import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = null;
  password: string = null;
  operation: string = 'login';
  nick: string = null;
  errors: string = '';
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login () {
    this.authenticationService.loginWithEmail(this.email, this.password).then((data) => {
      alert('Loggin Correctamente');
      this.router.navigateByUrl('/home');
      console.log(data);
    }).catch(error => {
      this.errors = error.message;
    });
  }

  public register () {
    this.authenticationService.registerWithEmail(this.email, this.password).then((data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createUser(user).then(datos => {
        alert('Registrado Correctamente');
        console.log(datos);
      }).catch(error2 => {
        alert('Ocurrió un Error');
        console.log(error2);
      });
    }).catch(error => {
      alert('Ocurrió un Error');
      console.log(error);
    });
  }

}
