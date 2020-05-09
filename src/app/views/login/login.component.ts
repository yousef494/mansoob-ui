import { Component, OnInit } from "@angular/core";
import { NgForm, EmailValidator } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";
import { ToastrService } from 'ngx-toastr';

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

  alreadyLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {
    this.alreadyLoggedIn = this.authService.isAuthenticated();
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
          this.authService.setUser(res['data'], res['accessToken']);

          this.toastService.success("Authentication Success", "Logging in please wait");

          const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

          setTimeout((router: Router) => {
            this.router.navigate([returnUrl || "/"]);
          }, 1500);

          this.router.navigate(["/"]);
        },
        error => {
          this.toastService.error(error.error.status, error.error.message);
        }
      );
  }

  logout() {
    this.authService.logout();
    this.alreadyLoggedIn = this.authService.isAuthenticated();
  }
}
