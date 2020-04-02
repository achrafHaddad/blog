import { Injectable, NgZone } from "@angular/core";
import { User } from "./user";
import { SubService } from "./sub.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;
  token;
  isAuth = true;

  constructor(public sub: SubService) {}

  getToken() {
    this.token = JSON.parse(localStorage.getItem("token"));
    if (this.token) {
      this.isAuth = !this.isAuth;
    }
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
