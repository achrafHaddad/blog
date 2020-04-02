import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class GuardGuard implements CanActivate {
  constructor(private authS: AuthService, private router: Router) {}

  canActivate() {
    if (this.authS.isAuth) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
