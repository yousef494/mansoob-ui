import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ValidationHelper, MustMatch } from '../../_helper/validator_hp';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  providers: []
})

export class RegisterComponent {

  user = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    rpassword: null
  };
  feedbackInUserCreate = false;
  feedbackType: string = '';
  feedbackMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    vh: ValidationHelper
  ) {
    this.createUser = new User();
  }

  ngOnInit() { 
    this.initLoginForm();
  }


  signup(userForm: FormGroup) {
    this.feedbackInUserCreate = false;

    if (this.registerForm.invalid) {
      return;
    }
    this.authService
      .register({
        firstName: userForm.value["firstName"],
        lastName: userForm.value["lastName"],
        email: userForm.value["email"],
        password: userForm.value["password"]
      }).subscribe(
        res => {
          console.log(res);
          this.feedbackInUserCreate= true;
          this.feedbackType = (res.status=='Error')?'danger':'success';
          this.feedbackMessage =res.message;
          if(res.status!='Error'){
            this.toastService.success("Registeration Success", "Logging in please wait");
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 1000);  //1s
          }
        },
        error => {
          this.toastService.error("Registeration Failed!", error);
        }
      );
  }

  registerForm: FormGroup;
  initLoginForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        rpassword: new FormControl('', [Validators.required]),
      },
      {
        validator: MustMatch('password', 'rpassword')
    });
  }

}
