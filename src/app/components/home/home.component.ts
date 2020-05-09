import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '.././../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public devices = [];

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService
  ) { 
    let query = {user_id: this.auth.getUserId()}
    this.deviceService.queryItems(query).subscribe(
      res =>{
        this.devices = res[0];
        this.devices.push({name: 'العماره', severity: '-', level: '-', id: 1 });
      },
      err=>{
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

}
