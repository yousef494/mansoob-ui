import { Component, OnInit } from "@angular/core";
import { NgForm, EmailValidator } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: 'reset.component.html',
  providers: [EmailValidator]
})

export class ResetComponent {

  user = {
    email: null,
    password: null,
    rpassword: null
  };
  feedbackInReset = false;
  feedbackType: string = '';
  feedbackMessage: any;
  token: string = '';
  mode: string = 'request';
  createUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {
    this.createUser = new User();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.token = params['token'];
      if (this.mode == 'reset' && this.token == undefined) {
        this.router.navigate(["/"]);
      }
    });
  }

  request(userForm: NgForm) {
    this.feedbackInReset = false;

    const isValid: boolean = this.vaidateRequest(userForm);
    if (!isValid) {
      return;
    }
    this.authService
      .forgetPassword({
        email: userForm.value["email"]
      }).subscribe(
        res => {
          this.feedbackInReset = true;
          this.feedbackType = (res.status == 'Error') ? 'danger' : 'success';
          this.feedbackMessage = res.message;
          if (res.status != 'Error') {
            this.toastService.success("Email sent", "Link has been sent to your email");
          }
        },
        error => {
          this.toastService.error("Reset Failed!", error);
        }
      );
  }

  reset(userForm: NgForm) {
    this.feedbackInReset = false;
    const isValid: boolean = this.vaidateReset(userForm);
    if (!isValid) {
      return;
    }
    this.authService
      .resetPassword({
        email: userForm.value["email"],
        password: userForm.value["password"],
        token: this.token
      }).subscribe(
        res => {
          this.feedbackInReset = true;
          this.feedbackType = (res.status == 'Error') ? 'danger' : 'success';
          this.feedbackMessage = res.message;
          if (res.status != 'Error') {
            this.toastService.success("Reset Success", "Passwrd has reseted successfully");
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 1000);  //1s
          }
        },
        error => {
          this.toastService.error("Reset Failed!", error);
        }
      );
  }


  vaidateRequest(userForm: NgForm) {
    this.feedbackType = "danger";
    if (userForm.value["email"] == null) {
      this.feedbackInReset = true;
      this.feedbackMessage = "Cannot be empty!";
      return false;
    }
    return true;
  }

  vaidateReset(userForm: NgForm) {
    this.feedbackType = "danger";
    if (userForm.value["email"] == null
      || userForm.value["password"] == null || userForm.value["rpassword"] == null) {
      this.feedbackInReset = true;
      this.feedbackMessage = "Cannot be empty!";
      return false;
    }

    if (userForm.value["password"] != userForm.value["rpassword"]) {
      this.feedbackInReset = true;
      this.feedbackMessage = "Passwords don't match";
      return false;
    }

    return true;
  }

}
