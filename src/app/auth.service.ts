import { Injectable, NgZone } from "@angular/core";
import { User } from "./user";
import { SubService } from "./sub.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;

  constructor(public sub: SubService) {}

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
