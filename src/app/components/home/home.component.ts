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
    let query = { user_id: this.auth.getUserId() }
    this.deviceService.queryItems(query).subscribe(
      res => {
        this.devices = res[0];
      },
      err => {
        console.log(err);
      }
    );
    
    this.deviceService.queryShares(query).subscribe(
      res => {
        res[0].forEach(device => {
          let q = { id: device['device_id'] }
          this.deviceService.queryItems(q).subscribe(
            res => {
              res[0].forEach(item=>{
                this.devices.push(Object.assign(item, {type: 'shared'}));
              });
            },
            err => {
              console.log(err);
            }
          );
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

}
