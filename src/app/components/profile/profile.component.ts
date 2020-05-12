import { Component ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '.././../services/auth.service';
import { User, UserService } from '../../services/user';
import { NotificationService} from "../../services/notification.service";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ValidationHelper } from '../../_helper/validator_hp';
import { TranslateService } from "../../services/translate.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @ViewChild('updateAvatarModal') public updateAvatarModal: ModalDirective;

  public mode = '';

  public user: User;
  public user_cp: User;
  public notifications: any[] = [];

  public isAdmin: boolean = false;
  vh;

  constructor(
    private auth: AuthService, 
    private noti: NotificationService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private validationHelper: ValidationHelper,
    public translate: TranslateService
  ) {
    this.vh = validationHelper;
      this.isAdmin = this.auth.isAdmin();
      this.user = this.auth.getUser();
      this.user_cp = this.auth.getUser();

      this.getNotifications();
  }

  ngOnInit() {
    this.initLoginForm();
  }

  profileForm: FormGroup;
  initLoginForm() {
    this.profileForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required])
      });
  }

  getNotifications(){
    let self = this;
    this.noti.getItemsByUser(this.user.id).subscribe(
      res => {
        let groupsTmp = [];
        self.notifications = [];
        res[0].forEach(function (record) {
          let day = record['day'];
          let index = groupsTmp.indexOf(day);
          if(index == -1){
            groupsTmp.push(day);
            self.notifications.push({'title': day, 'data': [record]});
          } else {
            self.notifications[index]['data'].push(record);
          }
        });
      },
      error => {
      }
    );
  }

  updateDetails() {
    if (this.profileForm.invalid) {
      return;
    }
    this.userService.updatetItem(this.user.id,
      {
        firstName: this.user.firstName, lastName: this.user.lastName
      }).subscribe(
        res => {
          this.toastService.success("Success", "Record  was updated successfully");
          this.auth.setUserInfo(this.user);
          this.user = this.auth.getUser();
          this.mode = '';
        },
        error => {
          this.toastService.error("Error!", "Updaing record was failed");
        }
      );
  }

  resetDetails(){
    this.user = this.user_cp;
    this.mode = '';
  }


}
