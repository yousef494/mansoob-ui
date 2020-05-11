import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
    })

export class MultipleValuesController {
//Code related to multiple email control
public values = [];
public values_input = '';
detectChange(id) {
  let element = (<HTMLInputElement>document.getElementById(id));
  let val = element.value;
  if (val == undefined || val.length == 0) {
    return;
  }
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
  let invalidItems = [];
  let items = val.split(',');
  items.forEach(item => {
    console.log(item);
    EMAIL_REGEXP.test(item.trim()) ?
      this.values.push(item.trim()) :
      invalidItems.push(item.trim());
  })
  element.value = invalidItems.join(',');
  if(this.values.length>0){
    this.updateInput();
  }
}

removeItem(email) {
  const index = this.values.indexOf(email, 0);
  if (index > -1) {
    this.values.splice(index, 1);
  }
  console.log(this.values);
  this.updateInput();
}

updateInput(){
 // this.record.email_to = this.values.join(',');
}
//end of multiple control code

}