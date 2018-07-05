import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
    private getUsersUrl = 'http://localhost:7000/api/allUsers';
    // private getUsersUrl: string="../../assets/data/users.json";
    private deleteUserUrl = 'http://localhost:7000/api/management/:id';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  deleteUser(user) {
    return this.http.delete<any>(this.deleteUserUrl, user);
    }

    removeUser(number) {
      
    }
}
