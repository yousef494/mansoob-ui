import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtlService {

  constructor() { }

  changeRTL(){
    document.documentElement.getRootNode()
    let htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.setAttribute('dir','rtl');
  }

}
