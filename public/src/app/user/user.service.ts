import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    private registerUrl = 'http://localhost:7000/api/user';
    private loginUrl = 'http://localhost:7000/api/authenticate';
    private username = localStorage.getItem('username');

    constructor(private http: HttpClient, private router: Router) {
    }

    registerUser(user) {
        return this.http.post<any>(this.registerUrl, user);
    }
    loginUser(user) {
        return this.http.post<any>(this.loginUrl, user);
    }



    loggedIn() {
        return !!localStorage.getItem('x-access-token');
    }
    loggedAdmin() {
        if (this.username === 'admin') {

        return true;
    }
}
}
