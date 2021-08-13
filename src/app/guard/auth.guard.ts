import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if( !this.auth.isLoggedIn()) {
      this.router.navigate(['login'])
    }
    return true;
  }


}
