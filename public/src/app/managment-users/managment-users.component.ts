import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { ManageUsersService } from './managment-users.service';

@Component({
  selector: 'app-managment-users',
  templateUrl: './managment-users.component.html',
  styleUrls: ['./managment-users.component.css']
})
export class ManagmentUsersComponent implements OnInit {
  user = {};
  public users = [];

  constructor(private manageUsers: ManageUsersService) { }

  ngOnInit() {
    this.manageUsers.getUsers()
        .subscribe((users: User[]) => {
            users.forEach(user => {
                this.users.push(new User(user.name, user.email));
            });
        });
  }

  removeUser(user: User) {
    this.manageUsers.deleteUser(this.user)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
