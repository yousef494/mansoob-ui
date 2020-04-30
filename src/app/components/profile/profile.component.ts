import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '.././../services/auth.service';
import { NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  public userName: String;
  public role: String;
  public userId: String;
  public email: String;
  public notifications: any[] = [];


  public isAdmin: boolean = false;

  constructor(private auth: AuthService, private noti: NotificationService,
    private router: Router) {
      this.isAdmin = this.auth.isAdmin();
      this.getNotifications();
  }

  ngOnInit() {
    this.userName = this.auth.getUserName();
    this.role = this.auth.getRole();
    this.email = this.auth.getUserEmail();
  }


  getNotifications(){
    this.userId = this.auth.getUserId();
    let self = this;
    this.noti.getItemsByUser(this.userId).subscribe(
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

}
