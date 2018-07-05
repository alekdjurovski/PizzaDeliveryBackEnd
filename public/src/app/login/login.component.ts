import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { User } from '../user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private _user: UserService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._user.loginUser(this.user)
      .subscribe((response) => {
        if (response.token) {
          window.localStorage['x-access-token'] = response.token;
          window.localStorage.username = this.user.username;
          this.router.navigate(['']);
        }
      } ,
        err => console.log(err)
      );
  }

}
