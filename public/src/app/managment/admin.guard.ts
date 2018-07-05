import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {

              }

  canActivate(): boolean {
    if (this.userService.loggedAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
