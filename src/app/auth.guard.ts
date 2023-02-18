import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let useri: any;
      if(localStorage.getItem("usuario")){
        useri = JSON.parse(localStorage.getItem("usuario") || '{}');

        if(useri == undefined || (Object.keys(useri).length === 0)){
          this.router.navigateByUrl("/login");
          return false;
        }
        else{
          return true;
        }
      }
      this.router.navigateByUrl("/login");
      return false;
  }
  
}
