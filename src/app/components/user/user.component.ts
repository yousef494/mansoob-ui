import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  options = {
    name: 'user',
    pKey: 'id',
    pKey_label: 'ID',
    apiURL: 'api/v1',
    type: 'crud',
    csv: true
  };

  fields = [
    {
      key: 'id',
      title: 'id',
      description: 'id',
      visible: true,
      update: false,
      create: false
    },
    {
      key: 'email',
      title: 'Email'
    },
    {
      key: 'role',
      title: 'Role',
      options: ['basic','admin']
    }
  ];

  constructor() {}

  ngOnInit() {}

}