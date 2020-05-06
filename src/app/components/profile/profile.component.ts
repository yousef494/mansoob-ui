import { Component ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '.././../services/auth.service';
import { User } from '../../services/user';
import { NotificationService} from "../../services/notification.service";
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @ViewChild('updateAvatarModal') public updateAvatarModal: ModalDirective;

  public user: User;
  public notifications: any[] = [];

  public isAdmin: boolean = false;

  constructor(private auth: AuthService, private noti: NotificationService,
    private router: Router) {
      this.isAdmin = this.auth.isAdmin();
      this.user = this.auth.getUser();

      this.getNotifications();
  }

  ngOnInit() {
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


}
