import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { SubService } from "../sub.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authS: AuthService,
    private sub: SubService
  ) {}

  logForm: FormGroup;
  returnUrl: string;
  message: string;
  store = this.sub.getSub();
  onSubmit() {
    let user = this.store.find(u => u.email == this.logForm.value.email);
    console.log(this.logForm.value);
    if (this.logForm.invalid) {
      return;
    } else {
      if (
        this.logForm.value.email == user.email &&
        this.logForm.value.pass == user.password
      ) {
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem("isLoggedIn", "true");
        let token = {
          name: user.name,
          uid: user.uid
        };
        localStorage.setItem("token", JSON.stringify(token));
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = "Please check your userid and password";
      }
    }
  }

  ngOnInit() {
    this.logForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      pass: new FormControl("", Validators.required)
    });
    this.returnUrl = "/";
    this.authS.logout();
  }
}
