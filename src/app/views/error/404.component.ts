import { Component } from '@angular/core';
import { TranslateService } from "../../services/translate.service";

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor( public translate: TranslateService
    ) {
    }

}
