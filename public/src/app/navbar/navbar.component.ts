import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private username = localStorage.getItem('username');
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
  }

  loggedIn() {
    return localStorage.getItem('x-access-token');
}
  logOut() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('username');
    this.router.navigate(['']);
}

loggedAdmin() {
  if (this.username !== null && this.username === 'admin') {

  return true;
}


}
}
