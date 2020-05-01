import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '.././../services/auth.service';
import { DeviceService } from '.././../services/device.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @ViewChild('table', { static: false }) table;

  public record = {id:'', name:'', tank_height:'', tank_capacity: '' ,
   email_to: '', access_token: ''};
  public recordSelected = false;
  public updateStatus = '';


  constructor(
    private auth: AuthService, 
    private deiveSvr: DeviceService,
    private toastService: ToastrService
    ) {}

  options = {
    name: 'device',
    pKey: 'id',
    pKey_label: 'ID',
    apiURL: 'api/v1',
    loadURL: 'api/v1/device',
    forceServerUpdate: true,
    type: 'simple',
    csv: false,
    pdf: false
  };

  fields = [
    {
      key: 'id',
      title: 'id',
      description: 'id',
      visible: false,
      update: false,
      create: false
    },
    {
      key: 'name',
      title: 'Name'
    },
    {
      key: 'severity',
      title: 'Current Severity',
      update: false,
      create: false
    },
    {
      key: 'level',
      title: 'Current Level',
      update: false,
      create: false
    }
  ];
  

  showDetials($event) {
    if ($event == "unselected") {
      this.recordSelected = false;
    } else {
      this.record = Object.assign(this.record, $event);
      this.recordSelected = true;
    }
  }

  generateAccessToken(){
    this.auth.generateAPIAccessToken(this.record['id']).subscribe(
      res => {
        this.record['access_token'] = res['accessToken'];
      },
      error => {
      }
    );
  }

  updateDetails(){
    this.deiveSvr.updatetItem(this.record['id'],
    { name: this.record['name'], tank_height: this.record['tank_height'],
     tank_capacity: this.record['tank_capacity'] , email_to: this.record['email_to'] } ).subscribe(
      res => {
        console.log(res);
        this.toastService.success("Success", "Record  was updated successfully");
        this.updateStatus = 'success';
      },
      error => {
        console.error(error);
        this.toastService.error("Error!", "Updaing record was failed");
        this.updateStatus = 'errorr';
      }
    );
  }


  public copyToClipboard = function (id) {
    let val = (<HTMLInputElement>document.getElementById(id)).value;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnInit() { }


}
