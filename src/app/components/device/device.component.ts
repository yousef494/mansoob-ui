import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '.././../services/auth.service';
import { DeviceService } from '.././../services/device.service';
import { ToastrService } from 'ngx-toastr';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { ValidationHelper, NumbericValidator } from '../../_helper/validator_hp';
import { TranslateService } from "../../services/translate.service";

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
  vh;

  constructor(
    private auth: AuthService,
    private deviceService: DeviceService,
    private toastService: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private validationHelper: ValidationHelper,
    public translate: TranslateService
  ) {
    this.vh = validationHelper;
  }


  ngOnInit() {
    this.initDetialsForm();
  }

  detialsForm: UntypedFormGroup;
  initDetialsForm() {
    this.detialsForm = this.formBuilder.group(
      {
        name: new UntypedFormControl('', [Validators.required]),
        tank_capacity: new UntypedFormControl(8, [Validators.required, NumbericValidator.numeric]),
        tank_height: new UntypedFormControl(150, [Validators.required, NumbericValidator.numeric]),
        email_to: new UntypedFormControl('', []),
        email_to_input: new UntypedFormControl('', [])
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
      //for multiple email control
      this.email_to_input = this.record.email_to;
    }
  }

  showShared(device_id) {
    this.recordShared = [];
    this.recordShared_cpy = [];
    this.recordShared_ids = [];
    let query = { device_id: device_id };
    this.deviceService.queryItemsWithEmails(device_id).subscribe(
      res => {
        //extract only users whom whared with
        res[0].forEach(share => {
          this.recordShared.push(share['email']);
          this.recordShared_cpy.push(share['email']);
          this.recordShared_ids.push(share['id']);
        });
        this.recordShared_string = this.list_to_csv(this.recordShared);
        this.recordShared_emails_input = this.recordShared_string;

      },
      err => {

      }
    );
  }

  list_to_csv(list) {
    let str = '';
    for (let i = 0; i < list.length; i++) {
      str = str + list[i] + ',';
    }
    if (str.length > 0) {
      str = str.substring(0, str.length - 1);
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
          res => { },
          error => { }
        );
      });
    }

    let device_id = this.record['id'];
    //addd the defined ones from the form
    if (this.recordShared.length > 0) {
      this.recordShared.forEach(email => {
        this.deviceService.createItemFromEmail(
          { device_id: device_id, email: email }).subscribe(
            res => {
              this.toastService.success("Success", "Record  was updated successfully");
             },
            error => {
              this.toastService.error("Error!", "Updaing record was failed");
             }
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

  //Code related to multiple email control
  public emails = [];
  public email_to_input = '';

  public recordShared_emails = [];
  public recordShared_emails_input = '';
  multipleEmailInput(id, formNum, items_list: string[]) {
    let element = (<HTMLInputElement>document.getElementById(id));
    let val = element.value;
    if (val == undefined || val.length == 0) {
      return;
    }
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    let invalidEmails = [];
    let potEmails = val.split(',');
    potEmails.forEach(email => {
      EMAIL_REGEXP.test(email.trim()) ?
      items_list.push(email.trim()) :
        invalidEmails.push(email.trim());
    })
    element.value = invalidEmails.join(',');
    if(items_list.length>0){
      this.updateInput(formNum, items_list);
    }
  }

  removeEmailItem(email,formNum, items_list: string[]) {
    const index = items_list.indexOf(email, 0);
    if (index > -1) {
      items_list.splice(index, 1);
    }
    this.updateInput(formNum, items_list);
  }

  updateInput(formNum, items_list: string[]){
    if(formNum == 1){
      this.record.email_to = items_list.join(',');
    }
    if(formNum == 2){
      this.recordShared_string = items_list.join(',');
    }
  }
  //end of multiple control code


}
