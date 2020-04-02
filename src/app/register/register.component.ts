import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormControl
} from "@angular/forms";
import { User } from "../user";
import { SubService } from "../sub.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  store: any[] = [];
  regForm: FormGroup;
  users: User[];
  returnUrl;
  constructor(private router: Router, private sub: SubService) {}

  submit() {
    if (this.regForm.valid) {
      const user = {
        name: this.regForm.value.name,
        email: this.regForm.value.email,
        password: this.regForm.value.pass
      };
      this.sub.setSub(user);
      this.regForm.reset();
      this.router.navigate([this.returnUrl]);
    }
  }

  ngOnInit(): void {
    if (this.sub.getSub()) {
      this.store = this.sub.getSub();
    }
    console.log(this.store);

    this.regForm = new FormGroup({
      name: new FormControl("", [Validators.required, this.uniqueName()]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        this.uniqueEmail()
      ]),
      pass: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}"
        )
      ])
    });
    this.returnUrl = "/login";
  }

  uniqueName() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let user = this.store.length
        ? this.store.find(n => n.name == control.value)
        : null;

      if (user?.name) {
        return { unique: true };
      }
    };
  }

  uniqueEmail() {
    return (control: AbstractControl): ValidationErrors | null => {
      let user = this.store
        ? this.store.find(n => n.email == control.value)
        : null;

      if (user?.email) {
        return { unique: true };
      }
    };
  }

  validationMessages = {
    name: {
      required: "Name is required.",
      uniqueName: "Name is already taken."
    },
    email: {
      required: "Email is required.",
      email: "Enter a valid Email",
      uniqueEmail: "Email is already taken"
    }
  };

  formErrors = {
    name: "",
    email: ""
  };

  logValidationErrors(group: FormGroup = this.regForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = "";
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + " ";
            }
          }
        }
      }
    });
  }
}
