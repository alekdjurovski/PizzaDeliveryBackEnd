import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model = {};

  constructor(private _user: UserService, private router: Router) {

   }

  ngOnInit() {
  }



  onSubmit(registerForm) {
    // debugger;
  }

  registerUser() {
    this._user.registerUser(this.model)
      .subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(['']);
        },
        err => console.log(err)
      );
  }

}
