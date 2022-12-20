import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { ValidationHelper, MustMatch } from '../../_helper/validator_hp';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: 'reset.component.html',
  providers: []
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
  vh;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private validationHelper: ValidationHelper
  ) {
    this.vh = validationHelper;

    this.createUser = new User();
  }

  ngOnInit() {
    this.initRequestForm()
    this.initResetForm();
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.token = params['token'];
      if (this.mode == 'reset' && this.token == undefined) {
        this.router.navigate(["/"]);
      }
    });
  }

  requestForm: UntypedFormGroup;
  initRequestForm() {
    this.requestForm = this.formBuilder.group(
      {
        email: new UntypedFormControl('', [Validators.required, Validators.email])
      });
  }

  request(userForm: UntypedFormGroup) {
    this.feedbackInReset = false;
    if (this.requestForm.invalid) {
      return;
    }
    this.authService
      .forgetPassword({
        email: userForm.value["email"]
      }).subscribe(
        res => {
          this.feedbackInReset = true;
          this.feedbackType = (res.status == 'Error') ? 'danger' : 'success';
          this.feedbackMessage = res.message || "Link has been sent to your email";
          if (res.status != 'Error') {
            this.toastService.success("Email sent", "Link has been sent to your email");
          }
        },
        error => {
          this.toastService.error("Reset Failed!", error);
        }
      );
  }

  resetForm: UntypedFormGroup;
  initResetForm() {
    this.resetForm = this.formBuilder.group(
      {
        email: new UntypedFormControl('', [Validators.required, Validators.email]),
        password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
        rpassword: new UntypedFormControl('', [Validators.required])
      },
      {
        validator: MustMatch('password', 'rpassword')
    });
  }

  reset(userForm: UntypedFormGroup) {
    this.feedbackInReset = false;
    if (this.resetForm.invalid) {
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
          this.feedbackMessage = res.message || "Passwrd has reseted successfully";
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


}
