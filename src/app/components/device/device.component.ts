import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '.././../services/auth.service';
import { DeviceService } from '.././../services/device.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ValidationHelper, NumbericValidator } from '../../_helper/validator_hp';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @ViewChild('table', { static: false }) table;

  public record = {
    id: '', name: '', tank_height: '', tank_capacity: '',
    email_to: '', access_token: ''
  };
  public record_cpy = {
    id: '', name: '', tank_height: '', tank_capacity: '',
    email_to: '', access_token: ''
  };

  public recordShared_string: string = '';
  public recordShared = [];
  public recordShared_cpy = [];
  public recordShared_ids = [];

  public recordSelected = false;

  constructor(
    private auth: AuthService,
    private deviceService: DeviceService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private vh: ValidationHelper
  ) { }


  ngOnInit() {
    this.initDetialsForm();
  }

  detialsForm: FormGroup;
  initDetialsForm() {
    this.detialsForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        tank_capacity: new FormControl(8, [Validators.required, NumbericValidator.numeric]),
        tank_height: new FormControl(150, [Validators.required, NumbericValidator.numeric]),
        email_to: new FormControl('', [])
      });
  }

  options = {
    name: 'device',
    pKey: 'id',
    pKey_label: 'ID',
    apiURL: 'api/v1',
    loadURL: 'api/v1/device?user_id=' + this.auth.getUserId(),
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
      this.record_cpy = Object.assign(this.record, $event);
      this.recordSelected = true;
      this.showShared(this.record['id']);
    }
  }

  showShared(device_id) {
    this.recordShared = [];
    this.recordShared_cpy = [];
    this.recordShared_ids = [];
    let query = { device_id: device_id };
    this.deviceService.queryShares(query).subscribe(
      res => {
        console.log(res);
        //extract only users whom whared with
        res[0].forEach(share => {
          this.recordShared.push(share['user_id']);
          this.recordShared_cpy.push(share['user_id']);
          this.recordShared_ids.push(share['id']);
        });
        this.recordShared_string = this.list_to_csv(this.recordShared);
      },
      err => {

      }
    );
  }

  list_to_csv(list) {
    let str = '';
    for (let i = 0; i < list.length; i++) {
      str = str + list[i]+',';
    }
    if(str.length>0){
      str = str.substring(0,str.length-1);
    }
    return str;
  }

  generateAccessToken() {
    this.auth.generateAPIAccessToken(this.record['id']).subscribe(
      res => {
        this.record['access_token'] = res['accessToken'];
      },
      error => {
      }
    );
  }

  resetDetails() {
    this.record = this.record_cpy;
  }

  updateDetails() {
    this.deviceService.updatetItem(this.record['id'],
      {
        name: this.record['name'], tank_height: this.record['tank_height'],
        tank_capacity: this.record['tank_capacity'], email_to: this.record['email_to']
      }).subscribe(
        res => {
          this.toastService.success("Success", "Record  was updated successfully");
        },
        error => {
          this.toastService.error("Error!", "Updaing record was failed");
        }
      );
  }


  resetShared() {
    this.recordShared = this.recordShared_cpy;
    this.recordShared_string = this.list_to_csv(this.recordShared);
  }

  updateShared() {
    //get the new items
    this.recordShared = this.recordShared_string.split(',');
    //delete all existing ids for this device
    if (this.recordShared_ids.length > 0) {
      this.recordShared_ids.forEach(id => {
        this.deviceService.deleteShare(id).subscribe(
          res => {},
          error => {}
        );
      });
    }

    let device_id = this.record['id'];
    //addd the defined ones from the form
    if (this.recordShared.length > 0) {
      this.recordShared.forEach(user_id => {
        this.deviceService.createShare(
          { device_id: device_id, user_id: user_id }).subscribe(
          res => { },
          error => {}
        );
      });
    }

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


}
