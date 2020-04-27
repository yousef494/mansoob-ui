import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  options = {
    name: 'device',
    pKey: 'id',
    pKey_label: 'ID',
    apiURL: 'api/v1',
    loadURL: 'api/v1/device',
    type: 'crud',
    csv: true
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
      key: 'tank_capacity',
      title: 'Tank Capacity'
    },
    {
      key: 'tank_height',
      title: 'Tank Height'
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

  constructor() {}

  ngOnInit() {}

}
