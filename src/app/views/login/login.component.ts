import { Component, OnInit } from "@angular/core";
import { NgForm, EmailValidator } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: [EmailValidator]
})
export class LoginComponent {
    user = {
      email: null,
      password: null
    };
  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createUser = new User();
  }

  ngOnInit() { }

  signInWithEmail(userForm: NgForm) {
    this.authService
      .login({
        email: userForm.value["email"],
        password: userForm.value["password"]
      }).subscribe(
        res => {
          this.authService.setLoggedInUser(res['data']);
          localStorage.setItem('token', res['accessToken']);
          localStorage.setItem('name', res['data']['name']);
          localStorage.setItem('email', res['data']['email']);
          localStorage.setItem('role', res['data']['role']);
          localStorage.setItem('id', res['data']['id']);

          //	this.toastService.success("Authentication Success", "Logging in please wait");

          const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

          setTimeout((router: Router) => {
            this.router.navigate([returnUrl || "/"]);
          }, 1500);

          this.router.navigate(["/"]);
        },
        error => {
          //this.toastService.error("Authentication Failed", error);
        }
      );


  }
}
