import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { SubService } from "../sub.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private authS: AuthService,
    private sub: SubService
  ) {
    this.conUser = JSON.parse(localStorage.getItem("token"));
  }
  logout() {
    console.log("logout");
    this.authS.logout();
    this.router.navigate(["/login"]);
  }
  navbarOpen = false;
  name: string;
  conUser: any;
  users = this.sub.getSub();

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {}
}
