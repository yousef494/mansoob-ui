import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ValidationHelper } from '../../_helper/validator_hp';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "../../services/translate.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: []
})
export class LoginComponent {

  user = {
    email: null,
    password: null
  };
  errorInUserCreate = false;
  errorMessage: any;
  createUser;
  vh;

  alreadyLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private validationHelper: ValidationHelper,
    public translate: TranslateService
  ) {
    this.vh = validationHelper;
    this.alreadyLoggedIn = this.authService.isAuthenticated();
    this.createUser = new User();
  }

  ngOnInit() {
    this.initLoginForm();
    this.setLang();
  }

  loginForm: FormGroup;
  initLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });
  }


  signInWithEmail(userForm: FormGroup) {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login({
        email: userForm.value["email"],
        password: userForm.value["password"]
      }).subscribe(
        res => {
          if(res['status'] == 'Error'){
            this.toastService.error(res.status, res.message);
            return;
          }
          this.authService.setUser(res['data'], res['accessToken']);

          this.toastService.success("Authentication Success", "Logging in please wait");

          const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

          setTimeout((router: Router) => {
            this.router.navigate([returnUrl || "/"]);
          }, 1500);

          this.router.navigate(["/"]);
        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.authService.logout();
    this.alreadyLoggedIn = this.authService.isAuthenticated();
  }

  setLang() {
    let rtlSwitcherIsChecked = localStorage.getItem('rtl') || 'ع';
    let lang = rtlSwitcherIsChecked == 'ع'?'en':'ar';
    this.translate.use(lang).then(() => { });
  }
}
