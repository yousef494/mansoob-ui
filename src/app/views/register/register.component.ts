import { Component, OnInit } from "@angular/core";
import { NgForm, EmailValidator } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/user";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  providers: [EmailValidator]
})

export class RegisterComponent {

  user = {
    name: null,
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
    private toastService: ToastrService
  ) {
    this.createUser = new User();
  }

  ngOnInit() { }


  signup(userForm: NgForm) {
    this.feedbackInUserCreate = false;

    const isValid: boolean = this.vaidate(userForm);
    if(!isValid){
      return;
    }
    this.authService
      .register({
        name: userForm.value["name"],
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

  vaidate(userForm: NgForm){
    this.feedbackType = "danger";
    if(userForm.value["name"] == null || userForm.value["email"] == null
    || userForm.value["password"] == null || userForm.value["rpassword"] == null){
      this.feedbackInUserCreate= true;
      this.feedbackMessage ="Cannot be empty!";
      return false;
    }

    if(userForm.value["password"]!=userForm.value["rpassword"]){
      this.feedbackInUserCreate= true;
      this.feedbackMessage ="Passwords don't match";
      return false;
    }

    return true;
  }

}
