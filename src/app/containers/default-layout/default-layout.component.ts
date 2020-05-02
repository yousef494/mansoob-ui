import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { AuthService } from '.././../services/auth.service';
import { NotificationService } from "../../services/notification.service";
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  public userName: String;
  public role: String;
  public userId: String;
  public notifications: any[] = [];

  public timeNow: string = '';

  public isAdmin: boolean = false;

  constructor(private auth: AuthService, private noti: NotificationService,
    private router: Router) {
    this.isAdmin = this.auth.isAdmin();
    this.sidebarMinimized = this.isAdmin;
    this.getNotifications();
    this.timeNow = moment().format("dddd Do MMMM, YYYY HH:mm");
    setInterval(() => {
      this.timeNow = moment().format("dddd Do MMMM, YYYY HH:mm");
    }, 60000);
  }

  ngOnInit() {
    this.userName = this.auth.getUserName();
    this.role = this.auth.getRole();
    this.setTheme();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  getNotifications() {
    this.userId = this.auth.getUserId();
    let self = this;
    this.noti.getItemsByUser(this.userId).subscribe(
      res => {
        let groupsTmp = [];
        self.notifications = [];
        res[0].forEach(function (record) {
          let day = record['day'];
          let index = groupsTmp.indexOf(day);
          if (index == -1) {
            groupsTmp.push(day);
            self.notifications.push({ 'title': day, 'data': [record] });
          } else {
            self.notifications[index]['data'].push(record);
          }
        });
      },
      error => {
      }
    );
  }


  public themeSwitcherIsChecked = false;

  setTheme(){
   this.themeSwitcherIsChecked = localStorage.getItem('theme')=='dark';
   this.switchTheme();
  }

  switchTheme() {    
    const checked = this.themeSwitcherIsChecked;
    let body = document.getElementsByTagName('body')[0];
    if (checked) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

}
