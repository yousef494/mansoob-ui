(self["webpackChunkng"] = self["webpackChunkng"] || []).push([["main"],{

/***/ 68628:
/*!*****************************************!*\
  !*** ./src/app/_helper/validator_hp.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MustMatch": () => (/* binding */ MustMatch),
/* harmony export */   "NumbericValidator": () => (/* binding */ NumbericValidator),
/* harmony export */   "ValidationHelper": () => (/* binding */ ValidationHelper)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


let ValidationHelper = class ValidationHelper {
  constructor() {
    this.messages = {
      required: 'This is required field',
      dateInvalid: 'Date invalid',
      email: 'Invalid email format',
      mustMatch: 'Mismatch inputs',
      minlength: 'Minimum length ',
      min: 'Invalid value',
      number: 'Invalid input: numeric value only'
    };
  }
  isValid(formGroup, key) {
    let control = formGroup.controls[key];
    if (control == undefined || control.disabled) {
      return true;
    }
    return !((control.dirty || control.touched) && control.invalid && control.errors); // (!control.touched) && control.valid;
  }
  /**
  * It returns validation message to be appear under the invalid control
  * @param key control name
  */
  getMsg(formGroup, key) {
    let errors = formGroup.controls[key].errors;
    if (errors == undefined) {
      return;
    }
    let validator = Object.keys(errors)[0];
    if (validator == 'dateInvalid') {
      return formGroup.controls[key].errors['msg'];
    } else {
      let msg = this.messages[validator];
      if (errors[validator] != true) {
        console.log(errors[validator]);
        msg = msg + ' ' + JSON.stringify(errors[validator]);
      }
      return msg;
    }
  }
};
ValidationHelper = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({
  providedIn: 'root'
})], ValidationHelper);

function MustMatch(controlName, matchingControlName) {
  return formGroup => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        mustMatch: true
      });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
/**
 * Adapted from
 * https://stackoverflow.com/questions/45057907/input-type-number-only-numeric-value-validation
 */
class NumbericValidator {
  // Number only validation
  static numeric(control) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return {
      'number': true
    };
    return null;
  }
}

/***/ }),

/***/ 36953:
/*!*************************!*\
  !*** ./src/app/_nav.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "navItems": () => (/* binding */ navItems)
/* harmony export */ });
let navItems_list = [{
  name: 'Home',
  url: '/home',
  icon: 'icon-home',
  roles: ['ADMIN', 'BASIC']
}, {
  name: 'Dashboard',
  url: '/dashboard',
  icon: 'icon-speedometer',
  roles: ['ADMIN', 'BASIC']
}, {
  name: 'Devices',
  url: '/device',
  icon: 'fa fa-tablet',
  roles: ['ADMIN', 'BASIC']
}, {
  title: true,
  name: 'Adminstration'
}, {
  name: 'User',
  url: '/user',
  icon: 'icon-user',
  roles: ['ADMIN']
}];
/*
@Injectable({
  providedIn: "root"
})
export class NavItems {
  data: any = {};
  constructor() {}

   public navItems(role, translate){
    let navItems_array: INavData[] = [];
    navItems_list.forEach(item =>{
      if((item.roles && item.roles.indexOf(role)>-1) || item.title){
        delete item.roles;
        item['name'] = translate.data[item['name']];
        navItems_array.push(item);
      }
    });
    return navItems_array;
  }
}
*/
function navItems(role, translate) {
  let navItems_array = [];
  navItems_list.forEach(item => {
    if (item.roles && item.roles.indexOf(role) > -1 || item.title) {
      delete item.roles;
      item['name'] = translate.data[item['name']];
      navItems_array.push(item);
    }
  });
  return navItems_array;
}

/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 60124);
var _class;



let AppComponent = (_class = class AppComponent {
  constructor(router) {
    this.router = router;
  }
  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__.NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}, _class.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_0__.Router
}], _class);
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})], AppComponent);


/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "setupTranslateFactory": () => (/* binding */ setupTranslateFactory)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/platform-browser/animations */ 37146);
/* harmony import */ var _angular_common_http___WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var _angular_forms___WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/forms/ */ 2508);
/* harmony import */ var ngx_perfect_scrollbar___WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ngx-perfect-scrollbar/ */ 15375);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers */ 52578);
/* harmony import */ var _views_error_404_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/error/404.component */ 26943);
/* harmony import */ var _views_error_500_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/error/500.component */ 98743);
/* harmony import */ var _views_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/login/login.component */ 93);
/* harmony import */ var _views_register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/register/register.component */ 60193);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/auth.service */ 37556);
/* harmony import */ var ngx_bootstrap_modal___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal/ */ 26528);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var ngx_avatar___WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ngx-avatar/ */ 94154);
/* harmony import */ var _ngx_share_core___WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @ngx-share/core/ */ 33326);
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.routing */ 76738);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ 15896);
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/tabs */ 33445);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ng2-charts */ 53808);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_wow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-wow */ 78048);
/* harmony import */ var _components_rd_table_rd_table_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/rd-table/rd-table.component */ 96267);
/* harmony import */ var ngx_easy_table__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ngx-easy-table */ 61994);
/* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/buttons */ 36615);
/* harmony import */ var _components_device_device_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/device/device.component */ 8635);
/* harmony import */ var _components_user_user_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/user/user.component */ 90241);
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ 619);
/* harmony import */ var angular_gauge_chart__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! angular-gauge-chart */ 47550);
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/settings/settings.component */ 66577);
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/profile/profile.component */ 87094);
/* harmony import */ var _components_profile_avatar_update_avatar_update_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/profile/avatar-update/avatar-update.component */ 20455);
/* harmony import */ var _views_reset_reset_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./views/reset/reset.component */ 5572);
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/home/home.component */ 68263);
/* harmony import */ var _helper_validator_hp__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_helper/validator_hp */ 68628);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./services/translate.service */ 21662);
/* harmony import */ var _services_auth_interceptor_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./services/auth-interceptor.service */ 32993);
/* harmony import */ var _components_analysis_analysis_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/analysis/analysis.component */ 34476);








const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
  suppressScrollX: true
};

// Import containers










const APP_CONTAINERS = [_containers__WEBPACK_IMPORTED_MODULE_1__.DefaultLayoutComponent];
// Import routing module

// Import 3rd party components4206






















function setupTranslateFactory(service) {
  return () => service.use('en');
}
let AppModule = class AppModule {};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_27__.NgModule)({
  imports: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_28__.NgbModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_29__.BrowserModule, _angular_common_http___WEBPACK_IMPORTED_MODULE_30__.HttpClientModule, _angular_forms___WEBPACK_IMPORTED_MODULE_31__.FormsModule, _angular_forms___WEBPACK_IMPORTED_MODULE_31__.ReactiveFormsModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_32__.BrowserAnimationsModule, _app_routing__WEBPACK_IMPORTED_MODULE_8__.AppRoutingModule, ngx_perfect_scrollbar___WEBPACK_IMPORTED_MODULE_33__.PerfectScrollbarModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_9__.BsDropdownModule.forRoot(), ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_10__.TabsModule.forRoot(), ng2_charts__WEBPACK_IMPORTED_MODULE_34__.ChartsModule, _angular_common__WEBPACK_IMPORTED_MODULE_35__.CommonModule, ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_13__.ButtonsModule, ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_13__.ButtonsModule.forRoot(), ngx_easy_table__WEBPACK_IMPORTED_MODULE_36__.TableModule, angular_gauge_chart__WEBPACK_IMPORTED_MODULE_37__.GaugeChartModule, ngx_bootstrap_modal___WEBPACK_IMPORTED_MODULE_7__.ModalModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_38__.ToastrModule.forRoot(), _ngx_share_core___WEBPACK_IMPORTED_MODULE_39__.ShareModule, ngx_avatar___WEBPACK_IMPORTED_MODULE_40__.AvatarModule.forRoot({
    colors: ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"],
    sourcePriorityOrder: [ngx_avatar___WEBPACK_IMPORTED_MODULE_40__.AvatarSource.CUSTOM, ngx_avatar___WEBPACK_IMPORTED_MODULE_40__.AvatarSource.INITIALS]
  })],
  declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, ...APP_CONTAINERS, _views_error_404_component__WEBPACK_IMPORTED_MODULE_2__.P404Component, _views_error_500_component__WEBPACK_IMPORTED_MODULE_3__.P500Component, _views_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent, _views_reset_reset_component__WEBPACK_IMPORTED_MODULE_20__.ResetComponent, _views_register_register_component__WEBPACK_IMPORTED_MODULE_5__.RegisterComponent, _components_device_device_component__WEBPACK_IMPORTED_MODULE_14__.DeviceComponent, _components_rd_table_rd_table_component__WEBPACK_IMPORTED_MODULE_12__.RDTableComponent, _components_user_user_component__WEBPACK_IMPORTED_MODULE_15__.UserComponent, _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_16__.DashboardComponent, _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_17__.SettingsComponent, _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_18__.ProfileComponent, _components_profile_avatar_update_avatar_update_component__WEBPACK_IMPORTED_MODULE_19__.AvatarUpdateComponent, _components_home_home_component__WEBPACK_IMPORTED_MODULE_21__.HomeComponent, _components_analysis_analysis_component__WEBPACK_IMPORTED_MODULE_25__.AnalysisComponent],
  providers: [_services_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService, {
    provide: _angular_common__WEBPACK_IMPORTED_MODULE_35__.LocationStrategy,
    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_35__.HashLocationStrategy
  }, ngx_wow__WEBPACK_IMPORTED_MODULE_11__.NgwWowService, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_28__.NgbModule, _helper_validator_hp__WEBPACK_IMPORTED_MODULE_22__.ValidationHelper, _services_translate_service__WEBPACK_IMPORTED_MODULE_23__.TranslateService, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_27__.APP_INITIALIZER,
    useFactory: setupTranslateFactory,
    deps: [_services_translate_service__WEBPACK_IMPORTED_MODULE_23__.TranslateService],
    multi: true
  }, {
    provide: _angular_common_http___WEBPACK_IMPORTED_MODULE_30__.HTTP_INTERCEPTORS,
    useClass: _services_auth_interceptor_service__WEBPACK_IMPORTED_MODULE_24__.AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
  schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_27__.NO_ERRORS_SCHEMA]
})], AppModule);


/***/ }),

/***/ 76738:
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule),
/* harmony export */   "routes": () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers */ 52578);
/* harmony import */ var _views_error_404_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/error/404.component */ 26943);
/* harmony import */ var _views_error_500_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/error/500.component */ 98743);
/* harmony import */ var _views_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/login/login.component */ 93);
/* harmony import */ var _views_register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/register/register.component */ 60193);
/* harmony import */ var _views_reset_reset_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/reset/reset.component */ 5572);
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../guards/auth.guard */ 46982);
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../guards/admin.guard */ 9332);
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/home/home.component */ 68263);
/* harmony import */ var _components_user_user_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/user/user.component */ 90241);
/* harmony import */ var _components_device_device_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/device/device.component */ 8635);
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ 619);
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/profile/profile.component */ 87094);



// Import Containers













const routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__.AuthGuard]
}, {
  path: '404',
  component: _views_error_404_component__WEBPACK_IMPORTED_MODULE_1__.P404Component,
  data: {
    title: 'Page 404'
  }
}, {
  path: '500',
  component: _views_error_500_component__WEBPACK_IMPORTED_MODULE_2__.P500Component,
  data: {
    title: 'Page 500'
  }
}, {
  path: 'login',
  component: _views_login_login_component__WEBPACK_IMPORTED_MODULE_3__.LoginComponent,
  data: {
    title: 'Login Page'
  }
}, {
  path: 'register',
  component: _views_register_register_component__WEBPACK_IMPORTED_MODULE_4__.RegisterComponent,
  data: {
    title: 'Register Page'
  }
}, {
  path: 'reset',
  component: _views_reset_reset_component__WEBPACK_IMPORTED_MODULE_5__.ResetComponent,
  data: {
    title: 'Reset Page'
  }
}, {
  path: '',
  component: _containers__WEBPACK_IMPORTED_MODULE_0__.DefaultLayoutComponent,
  data: {
    title: 'Home'
  },
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__.AuthGuard],
  children: [{
    path: 'home',
    component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__.HomeComponent,
    data: {
      title: 'Home'
    }
  }, {
    path: 'dashboard',
    component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__.DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }, {
    path: 'device',
    component: _components_device_device_component__WEBPACK_IMPORTED_MODULE_10__.DeviceComponent,
    data: {
      title: 'Devices'
    }
  }, {
    path: 'user',
    component: _components_user_user_component__WEBPACK_IMPORTED_MODULE_9__.UserComponent,
    canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_7__.AdminGuard],
    data: {
      title: 'Users'
    }
  }, {
    path: 'profile',
    component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_12__.ProfileComponent,
    //  canActivate: [AdminGuard],
    data: {
      title: 'Profile'
    }
  }]
}, {
  path: '**',
  component: _views_error_404_component__WEBPACK_IMPORTED_MODULE_1__.P404Component
}];
let AppRoutingModule = class AppRoutingModule {};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule.forRoot(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule]
})], AppRoutingModule);


/***/ }),

/***/ 34476:
/*!***********************************************************!*\
  !*** ./src/app/components/analysis/analysis.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnalysisComponent": () => (/* binding */ AnalysisComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _analysis_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analysis.component.html?ngResource */ 1324);
/* harmony import */ var _analysis_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analysis.component.css?ngResource */ 62165);
/* harmony import */ var _analysis_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_analysis_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
var _class;




let AnalysisComponent = (_class = class AnalysisComponent {
  constructor() {}
  ngOnInit() {}
}, _class.ctorParameters = () => [], _class);
AnalysisComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-analysis',
  template: _analysis_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_analysis_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], AnalysisComponent);


/***/ }),

/***/ 619:
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardComponent": () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _dashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.component.html?ngResource */ 17182);
/* harmony import */ var _dashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.component.css?ngResource */ 79578);
/* harmony import */ var _dashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 13491);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _coreui_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @coreui/utils */ 23407);
/* harmony import */ var _coreui_utils__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_coreui_utils__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @coreui/coreui-plugin-chartjs-custom-tooltips */ 33634);
/* harmony import */ var _coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_reading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/reading.service */ 10904);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng2-charts */ 53808);
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chartjs-plugin-annotation */ 22057);
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jspdf */ 84177);
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! html2canvas */ 9266);
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ngx_share_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-share/core */ 33326);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
var _class;

















let DashboardComponent = (_class = class DashboardComponent {
  constructor(readingService, share, router, route, toastService, translate) {
    this.readingService = readingService;
    this.share = share;
    this.router = router;
    this.route = route;
    this.toastService = toastService;
    this.translate = translate;
    this.device_id = '';
    this.canvasWidth = 200;
    this.centralLabel = '';
    this.gaugeNeedleValue = 50;
    this.name = 'Current level';
    this.options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['#4D0000', '#8b0202', '#8b0202', '#d9534f', '#ff8d00', '#f0ad4e', '#5cb85c', '#5cb85c'],
      arcDelimiters: [5, 10.5, 17, 25, 33, 50, 75],
      rangeLabel: ['0', '150'],
      needleStartValue: 0
    };
    this.radioModel = '24';
    this.today = '';
    this.tankHeight = 150.0;
    this.tankCapacity = 8.0;
    this.severity_class = 'bg-primary';
    this.severity_simple = '';
    this.severity = '';
    this.currentLevel = 0;
    this.currentLevel_percentage = 0;
    this.currentCapacity = 0;
    this.lable = '';
    this.time = '';
    this.averageConsumption = 0;
    this.dConsLst = [];
    this.dConsPercLst = [];
    this.timeToRefill = 0;
    this.limit = 280;
    this.refreshInterval = +localStorage.getItem("refreshInterval"); //300000 every 5 minutes
    this.counter = 1;
    // readingChart setup ***
    this.readingChartData = [];
    this.readingChartDataset = [{
      data: this.readingChartData,
      label: 'Level'
    }];
    this.readingChartDatasetColors = [{
      borderColor: (0,_coreui_utils__WEBPACK_IMPORTED_MODULE_9__.getStyle)('--primary'),
      borderWidth: 1,
      backgroundColor: (0,_coreui_utils__WEBPACK_IMPORTED_MODULE_9__.hexToRgba)((0,_coreui_utils__WEBPACK_IMPORTED_MODULE_9__.getStyle)('--primary'), 50)
    }];
    this.readingChartType = "line";
    this.readingChartLegend = false;
    this.readingChartLabels = [];
    this.readingChartOptions = {
      tooltips: {
        enabled: false,
        custom: _coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2__.CustomTooltips,
        plugins: [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_4__],
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {
              backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
            };
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              minute: 'HH:MM'
            }
          },
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            autoSkip: true
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(this.tankHeight / 5),
            max: this.tankHeight
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 1,
          borderColor: 'white',
          borderWidth: 1,
          hitRadius: 2,
          hoverRadius: 4,
          hoverBorderWidth: 3,
          hoverBackgroundColor: 'white'
        }
      },
      legend: {
        display: false
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 135,
          borderColor: (0,_coreui_utils__WEBPACK_IMPORTED_MODULE_9__.getStyle)('--success'),
          borderWidth: 1,
          label: {
            enabled: false,
            content: "Normal status"
          }
        }, {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 75,
          borderColor: '#f0ad4e',
          borderWidth: 1,
          label: {
            enabled: false,
            content: "Low status"
          }
        }, {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 49,
          borderColor: '#ff8d00',
          borderWidth: 1,
          label: {
            enabled: false,
            content: "Medium status"
          }
        }, {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 25,
          borderColor: '#d9534f',
          borderWidth: 1,
          label: {
            enabled: false,
            content: "High status"
          }
        }, {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 15,
          borderColor: 'rgb(139, 2, 2)',
          borderWidth: 1,
          label: {
            enabled: false,
            content: "Critical status"
          }
        }]
      }
    };
    // consumpiton chart setup
    this.consChartType = "bar";
    this.consChartLegend = true;
    this.consChartDataset = [{
      data: [],
      label: 'First Quarter',
      key: 'q1'
    }, {
      data: [],
      label: 'Second Quarter',
      key: 'q2'
    }, {
      data: [],
      label: 'Third Quarter',
      key: 'q3'
    }, {
      data: [],
      label: 'Fourth Quarter',
      key: 'q4'
    }, {
      data: [],
      label: 'Full Day',
      key: 'd'
    }];
    this.consChartLabels = [];
    this.consChartOptions = {
      scaleShowVerticalLines: false,
      maintainAspectRatio: false,
      responsive: true
    };
    //get device id
    this.route.queryParams.subscribe(params => {
      this.device_id = params['device_id'] || localStorage.getItem('device_id');
      if (this.device_id === null) {
        this.router.navigate(["/"]);
      } else {
        localStorage.setItem('device_id', this.device_id);
      }
    });
  }
  ngOnInit() {
    this.limit = 280;
    this.refreshContent();
    let initR = localStorage.getItem('refreshInterval') || '5';
    this.setRefreshInterval(+initR);
  }
  formatDate(date, format) {
    return moment__WEBPACK_IMPORTED_MODULE_5__(date.toString()).format(format);
  }
  isOutDated() {
    let isOutDated = '';
    let minutes = this.refreshInterval / 60 / 1000;
    let isOutDatedDanger = moment__WEBPACK_IMPORTED_MODULE_5__().isAfter(moment__WEBPACK_IMPORTED_MODULE_5__(this.time).add(minutes + 10, 'minutes'));
    isOutDated = isOutDatedDanger ? 'danger' : moment__WEBPACK_IMPORTED_MODULE_5__().isAfter(moment__WEBPACK_IMPORTED_MODULE_5__(this.time).add(10, 'minutes')) ? 'info' : undefined;
    return isOutDated;
  }
  reading_controller(timestamp, currentlevel) {
    var t = [112.5, 75, 49.5, 37.5, 25.5, 15, 7.5, 0];
    var labeles = ["Normal", "Normal", "Low", "Medium", "High", "Critical", "Critical", "Critical", "Unknown"];
    var color = ["#5cb85c", "#5cb85c", "#f0ad4e", "#ff8d00", "#d9534f", "#8b0202", "#8b0202", "#4D0000", "#382724"];
    var shape = ["fa-smile-o", "fa-smile-o", "fa-meh-o", "fa-meh-o", "fa-frown-o", "fa-frown-o", "fa-frown-o", "fa-frown-o", "fa-cubes"];
    var bar = ["bar-normal", "bar-normal", "bar-low", "bar-medium", "bar-high", "bar-critical", "bar-critical", "bar-critical", ""];
    var severity_class = ["status-normal", " status-normal", " status-low", " status-medium", " status-high", " status-critical", " status-critical", " status-critical", ""];
    var severity_label = ["Normal", "Normal", "Low", "Medium", "High", "Critical", "Critical", "Critical", ""];
    var result = 0;
    if (currentlevel > t[0]) {
      result = 0;
    } else if (currentlevel <= t[0] && currentlevel > t[1]) {
      result = 1;
    } else if (currentlevel <= t[1] && currentlevel > t[2]) {
      result = 2;
    } else if (currentlevel <= t[2] && currentlevel > t[3]) {
      result = 3;
    } else if (currentlevel <= t[3] && currentlevel > t[4]) {
      result = 4;
    } else if (currentlevel <= t[4] && currentlevel > t[5]) {
      result = 5;
    } else if (currentlevel <= t[5] && currentlevel > t[6]) {
      result = 6;
    } else if (currentlevel <= t[6] && currentlevel > t[7]) {
      result = 7;
    } else {
      result = 8;
    }
    this.currentLevel = isNaN(currentlevel) ? 0 : currentlevel;
    this.lable = labeles[result];
    this.time = timestamp.substring(0, 19);
    this.severity_class = severity_class[result];
    this.severity = this.translate.data[severity_label[result]];
    this.severity_simple = shape[result];
    this.gaugeNeedleValue = this.currentLevel / this.tankHeight * 100; //normalize from e.g. 150 scale to 100
    this.currentLevel_percentage = Math.round(this.currentLevel / this.tankHeight * 100 * 10) / 10;
    this.currentCapacity = Math.round(this.currentLevel * (this.tankCapacity / this.tankHeight) * 10) / 10;
  }
  //update/switch betwen waterlevel 6 hrs and 24 hrs
  getReadingData(limit) {
    try {
      this.limit = limit;
      this.readingService.getItemsLimit(this.limit, {
        'device_id': this.device_id
      }).subscribe(res => {
        try {
          let self = this;
          this.readingChartLabels = [];
          this.readingChartData = [];
          this.readingChartDataset = [{
            data: this.readingChartData,
            label: 'Level'
          }];
          res[0].reverse().forEach(function (value) {
            self.readingChartLabels.push(value['timestamp']);
            self.readingChartData.push(+value['level']);
          });
          // The hidden line might cause an error of mixing up readingChartDataset and consChartDataset
          //this.readingChart.datasets[0].data = this.readingChartData;
          //console.log("g1.1 "+this.consChartDataset[0]['data'].length);
          this.readingChart.update();
          let lastRecord = res[0][res[0].length - 1];
          this.reading_controller(lastRecord['timestamp'], lastRecord['level']);
        } catch (err) {
          this.toastService.error("Error!", "Error while parsing the data (Reading controller)");
        }
      }, error => {
        if (error['error'] != undefined && error.error == "jwt expired") {
          this.router.navigate(["/login"]);
        }
      });
    } catch (err) {
      this.toastService.error("Error!", "Error while parsing the data (Reading controller)");
    }
  }
  // update consumption data, refill
  getConsData() {
    try {
      //Assign quarters 0 as init.
      this.consChartLabels = [];
      for (let i = 0; i < 5; i++) {
        this.consChartDataset[i]['data'] = [];
        this.consChartLabels.push('');
        for (let j = 0; j < 7; j++) {
          this.consChartDataset[i]['data'].push(0);
        }
      }
      this.readingService.getItemsConsumptionLimit(28, this.device_id).subscribe(res => {
        let self = this;
        let revInx = 6;
        this.averageConsumption = 0;
        res[0].forEach(function (record) {
          let diff = record['consumption'];
          let day = record['day'];
          let q = record['quarter'];
          self.averageConsumption = self.averageConsumption + diff;
          let index = self.consChartLabels.indexOf(day);
          //to break the loop
          if (revInx == -1 && index == -1) {
            return;
          }
          if (index == -1) {
            //first quarter record of the day
            self.consChartLabels[revInx] = day;
            //add day total
            self.consChartDataset[4]['data'][revInx] = diff;
            //add quarter cons. in corresponding data list
            self.consChartDataset[q - 1]['data'][revInx] = diff;
            revInx--;
          } else {
            //update day total            
            let d_total = self.consChartDataset[4]['data'][index] + diff;
            self.consChartDataset[4]['data'][index] = d_total;
            self.consChartDataset[q - 1]['data'][index] = diff;
          }
        });
        self.consChart.datasets = self.consChartDataset;
        self.consChart.update();
        let roundedNumber = Math.round(this.averageConsumption / this.consChartLabels.length);
        this.averageConsumption = this.fixIfNaN(roundedNumber);
        //calculate today's consumption
        let todayIndex = this.consChartLabels.indexOf(this.today);
        for (let i = 0; i < 5; i++) {
          let temp = this.consChartDataset[i]['data'][todayIndex];
          this.dConsLst.push(this.fixIfNaN(temp));
          this.dConsPercLst.push(this.fixIfNaN(this.getRoundedNumber(this.consChartDataset[i]['data'][todayIndex], this.tankHeight)));
          document.getElementById('q' + (i + 1) + 'ProgressBar').style.width = (this.dConsPercLst[i] | 0) + '%';
        }
        //calculate yesterday's consumption
        let yesterdayIndex = this.consChartLabels.indexOf(moment__WEBPACK_IMPORTED_MODULE_5__().add(-1, 'day').format("YYYY-MM-DD"));
        // for (let i = 0; i < 5; i++) {
        let temp = this.consChartDataset[4]['data'][yesterdayIndex];
        this.dConsLst.push(this.fixIfNaN(temp));
        // }
        //calculate time to refill
        this.timeToRefill = Math.ceil(this.currentLevel / this.averageConsumption) - 1;
        if (isNaN(this.timeToRefill)) {
          this.timeToRefill = 0;
        }
        this.dayToRefill = moment__WEBPACK_IMPORTED_MODULE_5__().add(this.timeToRefill, 'day').format('ddd D MMM HH:mm');
      }, error => {
        if (error['error'] != undefined && error.error == "jwt expired") {
          this.router.navigate(["/login"]);
        }
      });
    } catch (err) {
      this.toastService.error("Error!", "Error while parsing the data (Consumption controller)");
    }
  }
  // dashboard refresh methods
  refreshContent() {
    this.today = moment__WEBPACK_IMPORTED_MODULE_5__().format("YYYY-MM-DD");
    //update water level data
    this.getReadingData(this.limit);
    //update consumption data
    this.getConsData();
  }
  setRefreshInterval(minutes) {
    if (this.refreshSubscription != null) {
      this.refreshSubscription.unsubscribe();
    }
    if (minutes != 'M') {
      this.refreshInterval = minutes * 60 * 1000;
      this.refreshSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.interval)(this.refreshInterval).subscribe(val => {
        this.refreshContent();
        this.counter++;
      });
    } else {
      this.refreshInterval = -1;
    }
    localStorage.setItem("refreshInterval", minutes + '');
  }
  isRefreshInterval(minutes) {
    if (minutes != 'M') {
      const tmp = minutes * 60 * 1000;
      return this.refreshInterval === tmp;
    } else {
      return this.refreshInterval === -1;
    }
  }
  //helper methods
  getRoundedNumber(num, dum) {
    return Math.round(num / dum * 100 * 10) / 10;
  }
  fixIfNaN(number) {
    return isNaN(number) ? '-' : number;
  }
  genPDF(elementId) {
    var data = document.getElementById(elementId);
    var dropdowns = data.getElementsByClassName('dropdown-menu');
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show');
    }
    html2canvas__WEBPACK_IMPORTED_MODULE_7___default()(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 500;
      var imgHeight = 500;
      //    if(canvas.width < canvas.height){
      //    imgHeight = canvas.height + pageHeight;
      //}else{
      imgHeight = canvas.height * imgWidth / canvas.width;
      //}
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      var pdf = new jspdf__WEBPACK_IMPORTED_MODULE_6__["default"]('p', 'mm', 'a4'); // A4 size page of PDF
      var top_position = 5;
      var left_position = 5;
      // pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
      pdf.addImage(contentDataURL, 'PNG', left_position, top_position, imgWidth, imgHeight);
      pdf.save(elementId + '.pdf'); // Generated PDF
    });
  }
}, _class.ctorParameters = () => [{
  type: _services_reading_service__WEBPACK_IMPORTED_MODULE_3__.ReadingService
}, {
  type: _ngx_share_core__WEBPACK_IMPORTED_MODULE_11__.ShareService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute
}, {
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_13__.ToastrService
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_8__.TranslateService
}], _class.propDecorators = {
  readingChart: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild,
    args: [ng2_charts__WEBPACK_IMPORTED_MODULE_15__.BaseChartDirective, {
      static: true
    }]
  }],
  consChart: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild,
    args: [ng2_charts__WEBPACK_IMPORTED_MODULE_15__.BaseChartDirective, {
      static: true
    }]
  }],
  infoModal: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild,
    args: ['infoModal']
  }]
}, _class);
DashboardComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.Component)({
  selector: 'app-dashboard',
  template: _dashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_dashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], DashboardComponent);


/***/ }),

/***/ 8635:
/*!*******************************************************!*\
  !*** ./src/app/components/device/device.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeviceComponent": () => (/* binding */ DeviceComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _device_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./device.component.html?ngResource */ 31927);
/* harmony import */ var _device_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./device.component.css?ngResource */ 94522);
/* harmony import */ var _device_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_device_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././../services/auth.service */ 37556);
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! .././../services/device.service */ 34811);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _helper_validator_hp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_helper/validator_hp */ 68628);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
var _class;










let DeviceComponent = (_class = class DeviceComponent {
  constructor(auth, deviceService, toastService, formBuilder, validationHelper, translate) {
    this.auth = auth;
    this.deviceService = deviceService;
    this.toastService = toastService;
    this.formBuilder = formBuilder;
    this.validationHelper = validationHelper;
    this.translate = translate;
    this.record = {
      id: '',
      name: '',
      tank_height: '',
      tank_capacity: '',
      email_to: '',
      access_token: ''
    };
    this.record_cpy = {
      id: '',
      name: '',
      tank_height: '',
      tank_capacity: '',
      email_to: '',
      access_token: ''
    };
    this.recordShared_string = '';
    this.recordShared = [];
    this.recordShared_cpy = [];
    this.recordShared_ids = [];
    this.recordSelected = false;
    this.options = {
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
    this.fields = [{
      key: 'id',
      title: 'id',
      description: 'id',
      visible: false,
      update: false,
      create: false
    }, {
      key: 'name',
      title: 'Name'
    }, {
      key: 'severity',
      title: 'Current Severity',
      update: false,
      create: false
    }, {
      key: 'level',
      title: 'Current Level',
      update: false,
      create: false
    }];
    this.copyToClipboard = function (id) {
      let val = document.getElementById(id).value;
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
    };
    //Code related to multiple email control
    this.emails = [];
    this.email_to_input = '';
    this.recordShared_emails = [];
    this.recordShared_emails_input = '';
    this.vh = validationHelper;
  }
  ngOnInit() {
    this.initDetialsForm();
  }
  initDetialsForm() {
    this.detialsForm = this.formBuilder.group({
      name: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required]),
      tank_capacity: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl(8, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _helper_validator_hp__WEBPACK_IMPORTED_MODULE_4__.NumbericValidator.numeric]),
      tank_height: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl(150, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _helper_validator_hp__WEBPACK_IMPORTED_MODULE_4__.NumbericValidator.numeric]),
      email_to: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', []),
      email_to_input: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', [])
    });
  }
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
    let query = {
      device_id: device_id
    };
    this.deviceService.queryItemsWithEmails(device_id).subscribe(res => {
      //extract only users whom whared with
      res[0].forEach(share => {
        this.recordShared.push(share['email']);
        this.recordShared_cpy.push(share['email']);
        this.recordShared_ids.push(share['id']);
      });
      this.recordShared_string = this.list_to_csv(this.recordShared);
      this.recordShared_emails_input = this.recordShared_string;
    }, err => {});
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
    this.auth.generateAPIAccessToken(this.record['id']).subscribe(res => {
      this.record['access_token'] = res['accessToken'];
    }, error => {});
  }
  resetDetails() {
    this.record = this.record_cpy;
  }
  updateDetails() {
    this.deviceService.updatetItem(this.record['id'], {
      name: this.record['name'],
      tank_height: this.record['tank_height'],
      tank_capacity: this.record['tank_capacity'],
      email_to: this.record['email_to']
    }).subscribe(res => {
      this.toastService.success("Success", "Record  was updated successfully");
    }, error => {
      this.toastService.error("Error!", "Updaing record was failed");
    });
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
        this.deviceService.deleteShare(id).subscribe(res => {}, error => {});
      });
    }
    let device_id = this.record['id'];
    //addd the defined ones from the form
    if (this.recordShared.length > 0) {
      this.recordShared.forEach(email => {
        this.deviceService.createItemFromEmail({
          device_id: device_id,
          email: email
        }).subscribe(res => {
          this.toastService.success("Success", "Record  was updated successfully");
        }, error => {
          this.toastService.error("Error!", "Updaing record was failed");
        });
      });
    }
  }
  multipleEmailInput(id, formNum, items_list) {
    let element = document.getElementById(id);
    let val = element.value;
    if (val == undefined || val.length == 0) {
      return;
    }
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    let invalidEmails = [];
    let potEmails = val.split(',');
    potEmails.forEach(email => {
      EMAIL_REGEXP.test(email.trim()) ? items_list.push(email.trim()) : invalidEmails.push(email.trim());
    });
    element.value = invalidEmails.join(',');
    if (items_list.length > 0) {
      this.updateInput(formNum, items_list);
    }
  }
  removeEmailItem(email, formNum, items_list) {
    const index = items_list.indexOf(email, 0);
    if (index > -1) {
      items_list.splice(index, 1);
    }
    this.updateInput(formNum, items_list);
  }
  updateInput(formNum, items_list) {
    if (formNum == 1) {
      this.record.email_to = items_list.join(',');
    }
    if (formNum == 2) {
      this.recordShared_string = items_list.join(',');
    }
  }
}, _class.ctorParameters = () => [{
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _services_device_service__WEBPACK_IMPORTED_MODULE_3__.DeviceService
}, {
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__.ToastrService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormBuilder
}, {
  type: _helper_validator_hp__WEBPACK_IMPORTED_MODULE_4__.ValidationHelper
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_5__.TranslateService
}], _class.propDecorators = {
  table: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
    args: ['table', {
      static: false
    }]
  }]
}, _class);
DeviceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-device',
  template: _device_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_device_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], DeviceComponent);


/***/ }),

/***/ 68263:
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _home_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component.html?ngResource */ 42403);
/* harmony import */ var _home_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.component.css?ngResource */ 54565);
/* harmony import */ var _home_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/device.service */ 34811);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! .././../services/auth.service */ 37556);
var _class;






let HomeComponent = (_class = class HomeComponent {
  constructor(deviceService, auth) {
    this.deviceService = deviceService;
    this.auth = auth;
    this.devices = [];
    let query = {
      user_id: this.auth.getUserId()
    };
    this.deviceService.queryItems(query).subscribe(res => {
      this.devices = res[0];
    }, err => {
      console.log(err);
    });
    this.deviceService.queryShares(query).subscribe(res => {
      res[0].forEach(device => {
        let q = {
          id: device['device_id']
        };
        this.deviceService.queryItems(q).subscribe(res => {
          res[0].forEach(item => {
            this.devices.push(Object.assign(item, {
              type: 'shared'
            }));
          });
        }, err => {
          console.log(err);
        });
      });
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {}
}, _class.ctorParameters = () => [{
  type: _services_device_service__WEBPACK_IMPORTED_MODULE_2__.DeviceService
}, {
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService
}], _class);
HomeComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-home',
  template: _home_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_home_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], HomeComponent);


/***/ }),

/***/ 20455:
/*!*****************************************************************************!*\
  !*** ./src/app/components/profile/avatar-update/avatar-update.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvatarUpdateComponent": () => (/* binding */ AvatarUpdateComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _avatar_update_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avatar-update.component.html?ngResource */ 66702);
/* harmony import */ var _avatar_update_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./avatar-update.component.css?ngResource */ 42794);
/* harmony import */ var _avatar_update_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_avatar_update_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_avatar_update_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/avatar-update.service */ 10694);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/translate.service */ 21662);
var _class;






let AvatarUpdateComponent = (_class = class AvatarUpdateComponent {
  constructor(uploader, translate) {
    this.uploader = uploader;
    this.translate = translate;
    this.isUploading = false;
    this.isError = false;
    this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
    this.fileName = 'No file selected';
  }
  ngOnInit() {
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });
    this.fileName = this.translate.data["Nofileselected"];
  }
  onChange(file) {
    this.isError = false;
    this.infoMessage = null;
    if (file) {
      let type = file['type'].toLowerCase();
      if (!(type == 'image/jpg' || type == 'image/png' || type == 'image/jpeg')) {
        this.infoMessage = this.translate.data["Onlyjpgpng"];
        this.isError = true;
        return;
      }
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }
  onUpload() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;
    this.uploader.upload(this.file).subscribe(message => {
      this.isUploading = false;
      this.isError = false;
      this.infoMessage = message;
    }, err => {
      this.isUploading = false;
      this.isError = true;
      this.infoMessage = "Error while uploading the file...";
      this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
    });
  }
}, _class.ctorParameters = () => [{
  type: _services_avatar_update_service__WEBPACK_IMPORTED_MODULE_2__.AvatarUpdateService
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_3__.TranslateService
}], _class);
AvatarUpdateComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-avatar-update',
  template: _avatar_update_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_avatar_update_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], AvatarUpdateComponent);


/***/ }),

/***/ 87094:
/*!*********************************************************!*\
  !*** ./src/app/components/profile/profile.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileComponent": () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.component.html?ngResource */ 84424);
/* harmony import */ var _profile_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.component.css?ngResource */ 76164);
/* harmony import */ var _profile_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_profile_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././../services/auth.service */ 37556);
/* harmony import */ var _services_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user */ 98803);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/notification.service */ 12013);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _helper_validator_hp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_helper/validator_hp */ 68628);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
var _class;












let ProfileComponent = (_class = class ProfileComponent {
  constructor(auth, noti, userService, router, toastService, formBuilder, validationHelper, translate) {
    this.auth = auth;
    this.noti = noti;
    this.userService = userService;
    this.router = router;
    this.toastService = toastService;
    this.formBuilder = formBuilder;
    this.validationHelper = validationHelper;
    this.translate = translate;
    this.mode = '';
    this.notifications = [];
    this.isAdmin = false;
    this.vh = validationHelper;
    this.isAdmin = this.auth.isAdmin();
    this.user = this.auth.getUser();
    this.user_cp = this.auth.getUser();
    this.getNotifications();
  }
  ngOnInit() {
    this.initLoginForm();
  }
  initLoginForm() {
    this.profileForm = this.formBuilder.group({
      firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]),
      lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required])
    });
  }
  getNotifications() {
    let self = this;
    this.noti.getItemsByUser(this.user.id).subscribe(res => {
      let groupsTmp = [];
      self.notifications = [];
      res[0].forEach(function (record) {
        let day = record['day'];
        let index = groupsTmp.indexOf(day);
        if (index == -1) {
          groupsTmp.push(day);
          self.notifications.push({
            'title': day,
            'data': [record]
          });
        } else {
          self.notifications[index]['data'].push(record);
        }
      });
    }, error => {});
  }
  updateDetails() {
    if (this.profileForm.invalid) {
      return;
    }
    this.userService.updatetItem(this.user.id, {
      firstName: this.user.firstName,
      lastName: this.user.lastName
    }).subscribe(res => {
      this.toastService.success("Success", "Record  was updated successfully");
      this.auth.setUserInfo(this.user);
      this.user = this.auth.getUser();
      this.mode = '';
    }, error => {
      this.toastService.error("Error!", "Updaing record was failed");
    });
  }
  resetDetails() {
    this.user = this.user_cp;
    this.mode = '';
  }
}, _class.ctorParameters = () => [{
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _services_notification_service__WEBPACK_IMPORTED_MODULE_4__.NotificationService
}, {
  type: _services_user__WEBPACK_IMPORTED_MODULE_3__.UserService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router
}, {
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_9__.ToastrService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder
}, {
  type: _helper_validator_hp__WEBPACK_IMPORTED_MODULE_5__.ValidationHelper
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_6__.TranslateService
}], _class.propDecorators = {
  updateAvatarModal: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild,
    args: ['updateAvatarModal']
  }]
}, _class);
ProfileComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-dashboard',
  template: _profile_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_profile_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ProfileComponent);


/***/ }),

/***/ 34926:
/*!*******************************************************!*\
  !*** ./src/app/components/rd-table/config.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigService": () => (/* binding */ ConfigService),
/* harmony export */   "DataHTTPService": () => (/* binding */ DataHTTPService),
/* harmony export */   "Schema": () => (/* binding */ Schema)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var ngx_easy_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-easy-table */ 61994);
var _class, _class2;




class Schema {
  constructor() {
    this.options = [];
    this.optionObj = {};
    this.visible = true;
  }
}
let ConfigService = (_class = class ConfigService {}, _class.config = {
  searchEnabled: false,
  headerEnabled: true,
  orderEnabled: false,
  paginationEnabled: true,
  exportEnabled: false,
  clickEvent: true,
  selectRow: false,
  selectCol: false,
  selectCell: false,
  rows: 10,
  additionalActions: false,
  serverPagination: false,
  isLoading: false,
  detailsTemplate: false,
  groupRows: false,
  paginationRangeEnabled: true,
  collapseAllRows: false,
  checkboxes: true,
  resizeColumn: false,
  fixedColumnWidth: true,
  horizontalScroll: false,
  draggable: false,
  logger: false,
  showDetailsArrow: false,
  showContextMenu: true,
  persistState: true,
  tableLayout: {
    style: ngx_easy_table__WEBPACK_IMPORTED_MODULE_0__.STYLE.NORMAL,
    theme: ngx_easy_table__WEBPACK_IMPORTED_MODULE_0__.THEME.LIGHT,
    borderless: false,
    hover: true,
    striped: false
  }
}, _class);
ConfigService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()], ConfigService);

let DataHTTPService = (_class2 = class DataHTTPService {
  constructor(http) {
    this.http = http;
  }
  getData(url, headers) {
    return this.http.get(`${url}`, {
      headers: headers
    });
  }
}, _class2.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
}], _class2);
DataHTTPService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()], DataHTTPService);


/***/ }),

/***/ 72381:
/*!**************************************************************!*\
  !*** ./src/app/components/rd-table/input-control.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputControlService": () => (/* binding */ InputControlService),
/* harmony export */   "NumbericValidator": () => (/* binding */ NumbericValidator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 2508);
var _class;

/**
 * Adapted from Google Inc, see the details below:
 * Copyright 2017-2018 Google Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at http://angular.io/license
 */


let InputControlService = (_class = class InputControlService {
  constructor() {
    this.messages = [];
    this.initMessages();
  }
  createFormGroup(record, fields) {
    let group = {};
    fields.forEach(attr => {
      let validators = [];
      if (attr['required']) {
        validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required);
      }
      let validator = attr['validator'] ? attr['validator'].split('(')[0] : '';
      switch (validator) {
        case 'required':
          {
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required);
            break;
          }
        case 'requiredTrue':
          {
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.requiredTrue);
            break;
          }
        case 'min':
          {
            let parm = attr['validator'].split('(')[1].split(')')[0];
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.min(parm));
            validators.push(NumbericValidator.numeric);
            break;
          }
        case 'max':
          {
            let parm = attr['validator'].split('(')[1].split(')')[0];
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.max(parm));
            validators.push(NumbericValidator.numeric);
            break;
          }
        case 'minLength':
          {
            let parm = attr['validator'].split('(')[1].split(')')[0];
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.minLength(parm));
            break;
          }
        case 'maxLength':
          {
            let parm = attr['validator'].split('(')[1].split(')')[0];
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.maxLength(parm));
            break;
          }
        case 'email':
          {
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.email);
            break;
          }
        case 'pattern':
          {
            let parm = attr['validator'].split('(')[1].split(')')[0];
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.pattern(parm));
            break;
          }
        case 'number':
          {
            validators.push(NumbericValidator.numeric);
            break;
          }
        default:
          {
            // no validation
            break;
          }
      }
      //add the validators and create a form control
      group[attr['key']] = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.UntypedFormControl(record[attr['key']] || '', validators);
    });
    return new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.UntypedFormGroup(group);
  }
  initMessages() {
    this.setMessage('required', 'This is required field');
    this.setMessage('requiredTrue', 'Please check this box to proceed');
    this.setMessage('min', 'Invalid value ');
    this.setMessage('max', 'Invalid value ');
    this.setMessage('email', 'Invalid email format');
    this.setMessage('minLength', 'Minimum length ');
    this.setMessage('maxLength', 'Maximum length ');
    this.setMessage('pattern', 'Invalid input format');
    this.setMessage('number', 'Invalid number: numeric value only');
  }
  setMessage(validatorName, message) {
    this.messages[validatorName] = message;
  }
  getMessage(validatorName) {
    return this.messages[validatorName];
  }
  getMessageFromError(error) {
    try {
      let validator = Object.keys(error)[0];
      let details = JSON.stringify(error[validator]);
      return this.getMessage(validator) + " " + (details != 'true' ? details : "");
    } catch (e) {
      return 'Invalid input';
    }
  }
}, _class.ctorParameters = () => [], _class);
InputControlService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()], InputControlService);

/**
 * Adapted from
 * https://stackoverflow.com/questions/45057907/input-type-number-only-numeric-value-validation
 */
class NumbericValidator {
  // Number only validation
  static numeric(control) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return {
      'number': true
    };
    return null;
  }
}

/***/ }),

/***/ 96267:
/*!***********************************************************!*\
  !*** ./src/app/components/rd-table/rd-table.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RDTableComponent": () => (/* binding */ RDTableComponent)
/* harmony export */ });
/* harmony import */ var _Users_Yousef_Documents_myworkspace_Mansoob_V2_mansoob_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _rd_table_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rd-table.component.html?ngResource */ 33765);
/* harmony import */ var _rd_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rd-table.component.scss?ngResource */ 27659);
/* harmony import */ var _rd_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rd_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var ngx_easy_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-easy-table */ 61994);
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.service */ 34926);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _input_control_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input-control.service */ 72381);

var _class;
/**
 * Usage: pass the following
 * - options: data options and operations (optional)
 * - fields: schema of the data fields (required)
 * - data: data table (optional)
 * - config: ngx-easy-table configurations (optional)
 *   https://ngx-easy-table.eu/#/doc
 *
 *  <app-details [options]="options" [fields]="fields" [data]="data" [config]="config"></app-details>
 *
 * Possible data options:
 * - name: data name (as it appears in the api URL e.g. /api/v1/<anme>/)(required)
 * - pKey: name of primary key attribute (required)
 * - apiUR: e.g. get/post/put/delete http://example/ component will inject opt.name and opt.pKey
 *        e.g. http://example/dataName/1
 * - type: simple/crud (default: simple)
 * - create: true/false (default: false)
 * - update: true/false (default: false)
 * - delete: true/false (default: false)
 * - loadURL: e.g. get http://example/load/  (default: undefined)
 * - createURL: e.g. post http://example/create/   (default: undefined)
 * - updateURL: e.g. put http://example/update/  (default: undefined)
 * - deleteURL: e.g. delete http://example/delete/  (default: undefined)
 * - forceServerUpdate: call load data after operation (create/update/delete) done successfully
 */










let RDTableComponent = (_class = class RDTableComponent {
  constructor(modalService, httpClient, ics) {
    this.modalService = modalService;
    this.options = {};
    this.data = [];
    this.config = {};
    this.recordSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.opt_obj = {
      name: '',
      pKey: 'id',
      pKey_label: 'ID',
      apiURL: undefined,
      type: 'simple',
      create: false,
      update: false,
      delete: false,
      csv: false,
      pdf: false,
      bootstrap: true,
      forceServerUpdate: false,
      loadURL: undefined,
      createURL: undefined,
      updateURL: undefined,
      deleteURL: undefined
    };
    this.schema = [];
    this.filteredSchema = [];
    this.message = '';
    this.alertContent = {};
    this.selectedRecords = new Set();
    this.operation = 'none';
    this.configuration = _config_service__WEBPACK_IMPORTED_MODULE_3__.ConfigService.config;
    this.dataHTTPService = new _config_service__WEBPACK_IMPORTED_MODULE_3__.DataHTTPService(httpClient);
    this.httpClient = httpClient;
    this.ics = ics;
  }
  ngOnInit() {
    this.processInputs();
    try {
      if (this.opt_obj.bootstrap == true) {
        this.setBootstrap();
      }
    } catch (e) {}
    if (this.opt_obj.loadURL != undefined || this.opt_obj.apiURL != undefined) {
      this.load();
    }
  }
  processInputs() {
    //exted the defult options with the passed by the user
    this.opt_obj = Object.assign(this.opt_obj, this.options);
    if (this.opt_obj.type.toLowerCase() === 'crud') {
      this.opt_obj.create = true;
      this.opt_obj.update = true;
      this.opt_obj.delete = true;
    }
    //init the schema from fields
    for (let field of this.fields) {
      let f = new _config_service__WEBPACK_IMPORTED_MODULE_3__.Schema();
      f = field;
      //this is for image display or custmized cells
      if (field['cellTemplate'] != undefined) {
        let elem = this.processTemplate(field['cellTemplate']);
        f.cellTemplate = elem.tplRef;
        f.collTemplateParms = elem.parms;
      }
      //should be visible in the table
      if (field['visible'] != false) {
        this.filteredSchema.push(f);
      }
      //should not be visible in the table, but in the form might be
      this.schema.push(f);
    }
    //extending ngx-easy-table configurations from the user 
    let configKeys = Object.keys(this.configuration);
    for (let configKey of configKeys) {
      if (this.config[configKey] != undefined) {
        this.configuration[configKey] = this.config[configKey];
      }
    }
  }
  /**
   *
   * @param input passed with collTemplate: e.g. (imageTpl:avatarUrls.16x16)
   */
  processTemplate(input) {
    let el = input.split(":");
    let tplRef;
    if (el[0] == 'imageTpl') {
      tplRef = this.imageTpl;
    }
    let parms = el[1].split('.');
    return {
      tplRef,
      parms
    };
  }
  /**
   * This is triggered by buttons (Create/Update/Delete)
   * It riggers modal service to open
   *
   * @param content passed from html button component
   * @param operation identifies the operation type (Create/Update/Delete)
   */
  openModal(content, operation) {
    // setup form content
    content.saveLabel = 'Save';
    content.closeLabel = 'Cancel';
    content.operation = operation;
    content.title = operation + ' Record';
    content.record = {};
    content.rowIndex = -1;
    if (operation == 'Update') {
      content.rowIndex = this.selectedRecords.values().next().value;
      content.record = this.data[content.rowIndex];
    } else if (operation == 'Delete') {
      content.saveLabel = 'Delete';
      content.rowIndex = [];
      content.records = [];
      this.selectedRecords.forEach(index => {
        content.rowIndex.push(index);
        let sTemp = index + "";
        let nTemp = +sTemp;
        content.records.push(this.data[nTemp]);
      });
    }
    this.loadOptions();
    //setup vaidation
    if (operation == 'Create' || operation == 'Update') {
      this.form = this.ics.createFormGroup(content.record, this.schema);
    } else {
      this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormGroup({});
    }
    //setup/open content
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    });
  }
  isValid(key) {
    return this.form.controls[key].valid;
  }
  getValidationMsg(key) {
    let errors = this.form.controls[key].errors;
    return this.ics.getMessageFromError(errors);
  }
  /**
   * This is triggered by table div for any click or event
   * @param $event
   */
  triggerAChangeEvent($event) {
    switch ($event.event) {
      case 'onCheckboxSelect':
        if (this.selectedRecords.has($event.value.rowId)) {
          this.selectedRecords.delete($event.value.rowId);
          this.recordSelected.emit("unselected");
        } else {
          this.selectedRecords.add($event.value.rowId);
          this.recordSelected.emit(this.data[$event.value.rowId]);
        }
        break;
      case 'onSelectAll':
        this.data.forEach((_, key) => {
          if (this.selectedRecords.has(key)) {
            this.selectedRecords.delete(key);
          } else {
            this.selectedRecords.add(key);
          }
        });
        break;
    }
  }
  /**
   * Handles click event from save button in the modal
   * @param operation Either Create/Update/Delete
   * @param rowIndex of the current index or indices to be processed
   */
  save(operation, rowIndex) {
    let row = {};
    let error = false;
    this.schema.forEach(attr => {
      try {
        let elem = document.getElementById(attr.key);
        if (elem !== undefined) {
          let el = document.getElementById(attr.key);
          if (attr.options != undefined) {
            //if (attr.type == 'multiple') {
            let ops = el.selectedOptions;
            let values = [];
            for (let i = 0; i < ops.length; i++) {
              let val = '';
              if (ops[i].value.split(":").length > 1) {
                val = ops[i].value.split(":")[1].trim().replace('\'', '').replace('\'', '');
              } else {
                val = ops[i].value;
              }
              values.push(val);
            }
            row[attr.key] = values.join(',');
            // } else {
            // row[attr.key] = (el.selectedOptions.item(0).value.split(":")[1]).trim().replace('\'','').replace('\'','');
            //}
          } else if (attr.type == 'checkbox') {
            let el = document.getElementById(attr.key);
            row[attr.key] = el.checked;
          } else {
            let el = document.getElementById(attr.key);
            row[attr.key] = el.value;
          }
        }
      } catch (error1) {}
    });
    //perfrome operation
    if (operation == 'Create') {
      this.createRow(row);
    } else if (operation == 'Update') {
      this.updateRow(rowIndex, row);
    } else if (operation == 'Delete') {
      this.deleteRow(rowIndex);
    }
    //destory the modal
    this.modalService.dismissAll();
  }
  /**
   * Create function
   * @param row new row to be created
   */
  createRow(row) {
    //perform server side post creation
    let url = '';
    if (this.opt_obj.createURL != undefined) {
      url = `${this.opt_obj.createURL}`;
    } else if (this.opt_obj.apiURL != undefined) {
      url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/`;
    }
    this.configuration.isLoading = true;
    this.httpClient.post(url, row, {
      headers: this.getAuthorizationHeaders()
    }).subscribe(res => {
      this.configuration.isLoading = false;
      //row[this.opt_obj['pKey']] = res[this.opt_obj['pKey']];
      if (this.opt_obj.forceServerUpdate) {
        this.load();
      } else {
        this.data.push(res);
      }
      this.data = [...this.data];
    }, err => {
      this.configuration.isLoading = false;
      this.reportError(err);
    });
  }
  /**
   * Update function
   * @param rowIndex edited rowIndex in the table
   * @param row edited row data
   */
  updateRow(rowIndex, row) {
    //perform server side put updating
    let url = '';
    if (this.opt_obj.updateURL != undefined) {
      url = `${this.opt_obj.updateURL}`;
    } else if (this.opt_obj.apiURL != undefined) {
      url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/${this.data[rowIndex][this.opt_obj.pKey]}`;
    }
    this.httpClient.put(url, row, {
      headers: this.getAuthorizationHeaders()
    }).subscribe(res => {
      this.configuration.isLoading = false;
      if (this.opt_obj.forceServerUpdate) {
        this.load();
      } else {
        this.data = [...this.data.map((obj, index) => {
          if (index === rowIndex) {
            return Object.assign({}, {}, res);
          }
          return obj;
        })];
      }
      this.selectedRecords.delete(rowIndex);
    }, err => {
      this.configuration.isLoading = false;
      this.reportError(err);
    });
  }
  /**
   * Delete method
   * @param rowIndecies row indecies to be removed
   */
  deleteRow(rowIndecies) {
    var _this = this;
    return (0,_Users_Yousef_Documents_myworkspace_Mansoob_V2_mansoob_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //sort descending to presist the indecies
      rowIndecies.sort(function (a, b) {
        return b - a;
      });
      //perform server side put updating
      _this.configuration.isLoading = true;
      for (let rowIndex of rowIndecies) {
        let url = '';
        if (_this.opt_obj.deleteURL != undefined) {
          url = `${_this.opt_obj.deleteURL}`;
        } else if (_this.opt_obj.apiURL != undefined) {
          url = `${_this.opt_obj.apiURL}/${_this.opt_obj.name}/${_this.data[rowIndex][_this.opt_obj.pKey]}`;
        }
        setTimeout(() => {
          _this.performDeleteion(url, rowIndex);
        }, 500);
      } //end of for loop
      _this.resetSelectAllCheckbox(false);
      if (_this.opt_obj.forceServerUpdate) {
        _this.load();
        _this.selectedRecords = new Set();
      }
      _this.configuration.isLoading = false;
    })();
  }
  /**
   * Communicate to the server to perfome the deletion
   * @param url for api deletion endpoint
   * @param rowIndex row index of single record
   */
  performDeleteion(url, rowIndex) {
    try {
      const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpParams().set(this.opt_obj.pKey, this.data[rowIndex][this.opt_obj.pKey]);
      this.httpClient.delete(url, {
        params: params,
        headers: this.getAuthorizationHeaders()
      }).subscribe(res => {
        this.selectedRecords.delete(rowIndex);
        this.data.splice(rowIndex, 1);
        this.data = [...this.data];
        return true;
      }, err => {
        this.reportError(err);
        return true;
      });
    } catch (err) {}
    return false;
  }
  resetSelectAllCheckbox(isChecked) {
    let checkLabel = document.querySelector('.ngx-form-checkbox');
    let children = checkLabel.children;
    let el = children[0];
    el.checked = isChecked;
  }
  /**
   * Loads the data from the server
   */
  load() {
    let url = '';
    if (this.opt_obj.loadURL != undefined) {
      url = `${this.opt_obj.loadURL}`;
    } else if (this.opt_obj.apiURL != undefined) {
      url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/`;
    }
    this.configuration.isLoading = true;
    this.dataHTTPService.getData(url, this.getAuthorizationHeaders()).subscribe(response => {
      this.configuration.isLoading = false;
      this.data = response;
      //console.log(response);
    }, error => {
      this.configuration.isLoading = false;
      console.error('ERROR: ', error.message);
    });
  }
  /**
   * Loads options  from the server
   */
  loadOptions() {
    for (let field of this.schema) {
      if (field['optionsURL'] != undefined && field['optionObj'] != undefined) {
        let url = field['optionsURL'];
        let fOp = field['optionObj'];
        this.dataHTTPService.getData(url, this.getAuthorizationHeaders()).subscribe(res => {
          let options = [];
          res.forEach(op => {
            options.push({
              value: op[fOp['value']],
              label: op[fOp['label']]
            });
          });
          field['options'] = options;
        }, error => {
          console.log(error);
        });
      }
    }
  }
  /**
   * To do: not implemented
   * @param name as required by the API
   */
  reset(name) {
    //not implemented yet....
    /*this.table.apiEvent({
      type: API.onGlobalSearch, value: name,
    });*/
  }
  /**
   * Export to CSV function ()
   * It deals with json data
   */
  exportToCSV() {
    const rows = this.data;
    let csvContent = 'data:text/csv;charset=utf-8,';
    let dataString = '';
    const x = [];
    const keys = Object.keys(this.data[0]);
    rows.forEach((row, index) => {
      x[index] = [];
      keys.forEach(i => {
        if (row.hasOwnProperty(i)) {
          if (typeof row[i] === 'object') {
            row[i] = 'Object'; // so far just change object to "Object" string
          }

          x[index].push(row[i]);
        }
      });
    });
    csvContent += keys + '\n';
    x.forEach((row, index) => {
      dataString = row.join(',');
      csvContent += index < this.data.length ? dataString + '\n' : dataString;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', this.opt_obj.name + '.csv');
    link.click();
  }
  setBootstrap() {
    this.table.apiEvent({
      type: ngx_easy_table__WEBPACK_IMPORTED_MODULE_8__.API.setTableClass,
      value: 'table table-bordered table-striped table-sm'
    });
  }
  getAuthorizationHeaders() {
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpHeaders(); //.
    //set("Authorization", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2JmZTE3OTdkZDZmYTVkNTRlYmI1ODIiLCJhY2Nlc3NfdG9rZW4iOiJMWlMxZ1BzZGUyRllxbjI4OEFFVTNFektJbVNQNk5SbiIsImlhdCI6MTU1NjA3OTAwN30.bjWAVC6Pmk9GG9SCjDbGiv7jYgzN1XpOjjYZN_n5HxI').
    //set('Content-Type', 'application/json').
    //set('Access-Control-Allow-Origin','*');
    return headers;
  }
  reportError(err) {
    let apiFeedback = err.error.message;
    // setup/open content
    this.alertContent['title'] = 'Error';
    this.alertContent['message'] = apiFeedback;
    this.modalService.open(this.alertModal, {
      windowClass: 'alert-modal',
      centered: true
    });
  }
}, _class.ctorParameters = () => [{
  type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModal
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient
}, {
  type: _input_control_service__WEBPACK_IMPORTED_MODULE_4__.InputControlService
}], _class.propDecorators = {
  table: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
    args: ['table', {
      static: false
    }]
  }],
  imageTpl: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
    args: ['imageTpl', {
      static: false
    }]
  }],
  alertModal: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
    args: ['alertModal', {
      static: false
    }]
  }],
  options: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  fields: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  data: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  config: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  recordSelected: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Output
  }]
}, _class);
RDTableComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-rd-table',
  template: _rd_table_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewEncapsulation.None,
  providers: [_config_service__WEBPACK_IMPORTED_MODULE_3__.ConfigService, _config_service__WEBPACK_IMPORTED_MODULE_3__.DataHTTPService, _input_control_service__WEBPACK_IMPORTED_MODULE_4__.InputControlService],
  styles: [(_rd_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], RDTableComponent);


/***/ }),

/***/ 66577:
/*!***********************************************************!*\
  !*** ./src/app/components/settings/settings.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsComponent": () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _settings_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.component.html?ngResource */ 59645);
/* harmony import */ var _settings_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.component.css?ngResource */ 92328);
/* harmony import */ var _settings_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_settings_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
var _class;




let SettingsComponent = (_class = class SettingsComponent {
  constructor() {}
  ngOnInit() {}
}, _class.ctorParameters = () => [], _class);
SettingsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-settings',
  template: _settings_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_settings_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], SettingsComponent);


/***/ }),

/***/ 90241:
/*!***************************************************!*\
  !*** ./src/app/components/user/user.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserComponent": () => (/* binding */ UserComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.component.html?ngResource */ 88649);
/* harmony import */ var _user_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.component.css?ngResource */ 42433);
/* harmony import */ var _user_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_user_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
var _class;




let UserComponent = (_class = class UserComponent {
  constructor() {
    this.options = {
      name: 'user',
      pKey: 'id',
      pKey_label: 'ID',
      apiURL: 'api/v1',
      type: 'crud',
      csv: true
    };
    this.fields = [{
      key: 'id',
      title: 'id',
      description: 'id',
      visible: true,
      update: false,
      create: false
    }, {
      key: 'email',
      title: 'Email'
    }, {
      key: 'firstName',
      title: 'First Name'
    }, {
      key: 'lastName',
      title: 'Last Name'
    }, {
      key: 'role',
      title: 'Role',
      options: ['BASIC', 'ADMIN']
    }, {
      key: 'status',
      title: 'Status',
      options: ['ACTIVE', 'INACTIVE']
    }];
  }
  ngOnInit() {}
}, _class.ctorParameters = () => [], _class);
UserComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-user',
  template: _user_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_user_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], UserComponent);


/***/ }),

/***/ 50830:
/*!***********************************************************************!*\
  !*** ./src/app/containers/default-layout/default-layout.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultLayoutComponent": () => (/* binding */ DefaultLayoutComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _default_layout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-layout.component.html?ngResource */ 8752);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_nav */ 36953);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././../services/auth.service */ 37556);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/notification.service */ 12013);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
var _class;









let DefaultLayoutComponent = (_class = class DefaultLayoutComponent {
  constructor(auth, noti, router, route, translate
  // private navItem: NavItems
  ) {
    this.auth = auth;
    this.noti = noti;
    this.router = router;
    this.route = route;
    this.translate = translate;
    this.sidebarMinimized = false;
    this.notifications = [];
    this.timeNow = '';
    this.isAdmin = false;
    this.themeSwitcherIsChecked = false;
    this.isAdmin = this.auth.isAdmin();
    this.sidebarMinimized = this.isAdmin;
    this.user = this.auth.getUser();
    this.getNotifications();
    this.timeNow = moment__WEBPACK_IMPORTED_MODULE_5__().format("dddd Do MMMM, YYYY HH:mm");
    setInterval(() => {
      this.timeNow = moment__WEBPACK_IMPORTED_MODULE_5__().format("dddd Do MMMM, YYYY HH:mm");
    }, 60000);
    this.getNavItems();
  }
  ngOnInit() {
    this.setTheme();
    this.setRTL();
  }
  getNavItems() {
    let rtlSwitcherIsChecked = localStorage.getItem('rtl') || 'ع';
    let lang = rtlSwitcherIsChecked == 'ع' ? 'en' : 'ar';
    this.translate.use(lang).then(() => {
      this.navItems = (0,_nav__WEBPACK_IMPORTED_MODULE_1__.navItems)(this.auth.getRole(), this.translate);
    });
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  getNotifications() {
    let self = this;
    this.noti.getItemsByUser("this.user.id").subscribe(res => {
      let groupsTmp = [];
      self.notifications = [];
      res[0].forEach(function (record) {
        let day = record['day'];
        let index = groupsTmp.indexOf(day);
        if (index == -1) {
          groupsTmp.push(day);
          self.notifications.push({
            'title': day,
            'data': [record]
          });
        } else {
          self.notifications[index]['data'].push(record);
        }
      });
    }, error => {});
  }
  setTheme() {
    this.themeSwitcherIsChecked = localStorage.getItem('theme') == 'dark';
    this.switchTheme();
  }
  switchTheme() {
    const checked = this.themeSwitcherIsChecked;
    let body = document.getElementsByTagName('body')[0];
    if (checked) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }
  setRTL() {
    //Check default
    this.rtlSwitcherIsChecked = localStorage.getItem('rtl') || 'ع';
    this.switchRTL(this.rtlSwitcherIsChecked);
  }
  switchRTL(rtl) {
    if (rtl == '') {
      rtl = 'ع'; //default is English (E)
    } else if (rtl == 'S') {
      // switch the current
      this.rtlSwitcherIsChecked = this.rtlSwitcherIsChecked == 'ع' ? 'E' : 'ع';
    }
    const isEnglish = this.rtlSwitcherIsChecked == 'ع';
    let htmlTag = document.getElementsByTagName('html')[0];
    if (isEnglish) {
      //set html dir to English
      this.rtlSwitcherIsChecked = 'ع';
      htmlTag.setAttribute('dir', '');
      localStorage.setItem('rtl', 'ع');
    } else {
      //set html dir to Arabic
      this.rtlSwitcherIsChecked = 'E';
      htmlTag.setAttribute('dir', 'rtl');
      localStorage.setItem('rtl', 'E');
    }
    this.setLang(isEnglish ? 'en' : 'ar');
  }
  setLang(lang) {
    //console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }
}, _class.ctorParameters = () => [{
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _services_notification_service__WEBPACK_IMPORTED_MODULE_3__.NotificationService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_4__.TranslateService
}], _class);
DefaultLayoutComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-dashboard',
  template: _default_layout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], DefaultLayoutComponent);


/***/ }),

/***/ 14639:
/*!****************************************************!*\
  !*** ./src/app/containers/default-layout/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultLayoutComponent": () => (/* reexport safe */ _default_layout_component__WEBPACK_IMPORTED_MODULE_0__.DefaultLayoutComponent)
/* harmony export */ });
/* harmony import */ var _default_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-layout.component */ 50830);


/***/ }),

/***/ 52578:
/*!*************************************!*\
  !*** ./src/app/containers/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultLayoutComponent": () => (/* reexport safe */ _default_layout__WEBPACK_IMPORTED_MODULE_0__.DefaultLayoutComponent)
/* harmony export */ });
/* harmony import */ var _default_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-layout */ 14639);


/***/ }),

/***/ 32993:
/*!******************************************************!*\
  !*** ./src/app/services/auth-interceptor.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppHttpInterceptor": () => (/* binding */ AppHttpInterceptor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 88759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
var _class;








let AppHttpInterceptor = (_class = class AppHttpInterceptor {
  constructor(toasterService, router) {
    this.toasterService = toasterService;
    this.router = router;
    this.execluded = ['login', 'upload', 'signup', 'forget', 'reset'];
  }
  intercept(req, next) {
    if (req.url.startsWith(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl) &&
    // req.url.indexOf('login') == -1 &&
    //  req.url.indexOf('upload') == -1 &&
    this.execluded.find(e => req.url.indexOf(e)).length == 0) {
      console.log(req.url);
      const token = localStorage.getItem('token');
      let headersOptions = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      req = req.clone({
        headers: headersOptions
      });
    }
    return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(evt => {
      if (evt instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpResponse) {
        if (evt.body && evt.body.success) this.toasterService.success(evt.body.message, evt.body.status);
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
      if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpErrorResponse) {
        try {
          console.log(err.error);
          if (err.error.type == 'Token') {
            //if token expired, redirect to login page
            this.router.navigate(["/login"]);
          }
          this.toasterService.error(err.error.message, err.error.status);
        } catch (e) {
          this.toasterService.error('An error occurred', '');
        }
        //log error 
      }

      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(err);
    }));
  }
}, _class.ctorParameters = () => [{
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
}], _class);
AppHttpInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable)()], AppHttpInterceptor);


/***/ }),

/***/ 37556:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ 98803);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 92340);
var _class;






let AuthService = (_class = class AuthService {
  constructor(router, http) {
    this.router = router;
    this.http = http;
    this.urlPrefix = '';
    this.endpoint = '/';
    this.user = null;
    this.urlPrefix = this.endpoint;
  }
  isLoggedIn() {
    if (this.user !== null) {
      return true;
    }
    return false;
  }
  setUser(user, token) {
    if (user != null) {
      let name = user['firstName'] + ' ' + user['lastName'];
      this.user = new _user__WEBPACK_IMPORTED_MODULE_0__.User();
      this.user.id = user.id;
      this.user.name = name;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
      this.user.role = user.role;
      this.user.avatar = user.id + "_avatar.png";
      //store in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }
  setUserInfo(user) {
    if (user != null) {
      let name = user['firstName'] + ' ' + user['lastName'];
      this.user = new _user__WEBPACK_IMPORTED_MODULE_0__.User();
      this.user.id = user.id;
      this.user.name = name;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
      this.user.role = user.role;
      this.user.avatar = user.id + "_avatar.png";
      //store in local storage
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }
  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user'));
  }
  getUserId() {
    if (this.getUser() !== null) {
      return this.getUser().id;
    }
    return '';
  }
  getUserName() {
    if (this.getUser() !== null) {
      return this.getUser().name;
    }
    return '';
  }
  getUserFirstName() {
    if (this.getUser() !== null) {
      return this.getUser().firstName;
    }
    return '';
  }
  getUserLastName() {
    if (this.getUser() !== null) {
      return this.getUser().lastName;
    }
    return '';
  }
  getUserEmail() {
    if (this.getUser() !== null) {
      return this.getUser().email;
    }
    return '';
  }
  getRole() {
    if (this.getUser() !== null) {
      return this.getUser().role;
    }
    return '';
  }
  getAvatar() {
    if (this.getUser() !== null) {
      return this.getUser().avatar;
    }
    return '';
  }
  isAdmin() {
    if (this.getRole() === "ADMIN") {
      return true;
    }
    return false;
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  // ------------- Methods ------------
  register(user) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/signup', user);
  }
  forgetPassword(user) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/forget', user);
  }
  resetPassword(user) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/reset', user);
  }
  login(credentials) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/login', credentials);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }
  findUserByEmail(email) {
    let query = {
      'email': email
    };
    return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/user?query=' + JSON.stringify(query));
  }
  getAuthUrl() {
    return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/auth');
  }
  authenticate(auth) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/auth', auth);
  }
  generateAPIAccessToken(device_id) {
    let data = {
      device_id: device_id,
      user_id: this.getUserId()
    };
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl + '/auth/deviceToken', data);
  }
}, _class.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
}], _class);
AuthService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)()], AuthService);


/***/ }),

/***/ 10694:
/*!***************************************************!*\
  !*** ./src/app/services/avatar-update.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvatarUpdateService": () => (/* binding */ AvatarUpdateService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 54350);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 88759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 35690);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 37556);
var _class;








let AvatarUpdateService = (_class = class AvatarUpdateService {
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
    this.progressSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(0);
    this.urlPrefix = '';
    this.endpoint = '/upload/avatar/';
    this.urlPrefix = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + this.endpoint;
  }
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    const req = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpRequest("POST", this.urlPrefix + this.auth.getUserId(), formData, {
      headers: headers,
      reportProgress: true
    });
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.forkJoin)(this.http.request(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(event => this.getEventMessage(event, file)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(envelope => this.processProgress(envelope)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.last)()));
  }
  processProgress(envelope) {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }
  getEventMessage(event, file) {
    switch (event.type) {
      case _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpEventType.UploadProgress:
        return Math.round(100 * event.loaded / event.total);
      case _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}, _class.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
}, {
  type: _auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService
}], _class);
AvatarUpdateService = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injectable)({
  providedIn: 'root'
})], AvatarUpdateService);


/***/ }),

/***/ 34811:
/*!********************************************!*\
  !*** ./src/app/services/device.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeviceService": () => (/* binding */ DeviceService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 54350);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 37556);
var _class;



 // change to new RxJS 6 import syntax


let DeviceService = (_class = class DeviceService {
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
    this.urlPrefix = '';
    this.endpoint = '/device/';
    this.urlPrefix = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + this.endpoint;
  }
  getCount() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + 'count'));
  }
  getItems() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix));
  }
  getItem(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + id));
  }
  queryItems(query) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + '?query=' + JSON.stringify(query)));
  }
  updatetItem(id, item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.patch(this.urlPrefix + id, item));
  }
  queryItemsWithEmails(device_id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + '/user_device/shares/' + device_id));
  }
  queryShares(query) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + '/user_device/' + '?query=' + JSON.stringify(query)));
  }
  createShare(item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + '/user_device/', item));
  }
  createItemFromEmail(item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + '/user_device/shares', item));
  }
  deleteShare(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + '/user_device/' + id));
  }
}, _class.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
}, {
  type: _auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService
}], _class);
DeviceService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
  providedIn: 'root'
})], DeviceService);


/***/ }),

/***/ 12013:
/*!**************************************************!*\
  !*** ./src/app/services/notification.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationService": () => (/* binding */ NotificationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 54350);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
var _class;



 // change to new RxJS 6 import syntax

let NotificationService = (_class = class NotificationService {
  constructor(http) {
    this.http = http;
    this.urlPrefix = '';
    this.endpoint = '/notification';
    this.urlPrefix = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + this.endpoint;
  }
  getCount() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + 'count'));
  }
  getItems() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix));
  }
  getItemsLimit(limit) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + 'time?sort=id&limit=' + limit));
  }
  getItemsConsumptionLimit(limit) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + 'consumption?limit=' + limit));
  }
  getItem(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + id));
  }
  queryItems(query) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + '?query=' + JSON.stringify(query)));
  }
  getItemsByUser(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + '/user?id=' + id));
  }
  createItem(item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.post(this.urlPrefix, item));
  }
  updatetItem(id, item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.patch(this.urlPrefix + id, item));
  }
  deleteItem(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.delete(this.urlPrefix + id));
  }
}, _class.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient
}], _class);
NotificationService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
  providedIn: 'root'
})], NotificationService);


/***/ }),

/***/ 10904:
/*!*********************************************!*\
  !*** ./src/app/services/reading.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReadingService": () => (/* binding */ ReadingService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 54350);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 37556);
var _class;



 // change to new RxJS 6 import syntax


let ReadingService = (_class = class ReadingService {
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
    this.urlPrefix = '';
    this.endpoint = '/reading/';
    this.urlPrefix = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + this.endpoint;
  }
  getCount() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + 'count'));
  }
  getItems() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix));
  }
  getItemsLimit(limit, query) {
    //return forkJoin(this.http.get<any[]>(this.urlPrefix+'time?query='+JSON.stringify(query)+'&sort=timestamp&limit='+limit, this.auth.httpOptions));
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + 'time?query=' + JSON.stringify(query) + '&sort=timestamp&limit=' + limit));
  }
  getItemsConsumptionLimit(limit, device_id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + 'consumption?device_id=' + device_id + '&limit=' + limit));
  }
  getItem(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + id));
  }
  queryItems(query) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.get(this.urlPrefix + '?query=' + JSON.stringify(query)));
  }
  createItem(item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.post(this.urlPrefix, item));
  }
  updatetItem(id, item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.patch(this.urlPrefix + id, item));
  }
  deleteItem(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(this.http.delete(this.urlPrefix + id));
  }
}, _class.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
}, {
  type: _auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService
}], _class);
ReadingService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
  providedIn: 'root'
})], ReadingService);


/***/ }),

/***/ 21662:
/*!***********************************************!*\
  !*** ./src/app/services/translate.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslateService": () => (/* binding */ TranslateService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
var _class;




let TranslateService = (_class = class TranslateService {
  constructor(http, titleService) {
    this.http = http;
    this.titleService = titleService;
    this.data = {};
  }
  use(lang) {
    return new Promise((resolve, reject) => {
      const langPath = `assets/i18n/${lang || "en"}.json`;
      this.http.get(langPath).subscribe(translation => {
        this.data = Object.assign({}, translation || {});
        this.titleService.setTitle(this.data["TITLE"]);
        resolve(this.data);
      }, error => {
        this.data = {};
        console.log("Error");
        resolve(this.data);
      });
    });
  }
}, _class.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient
}, {
  type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.Title
}], _class);
TranslateService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: "root"
})], TranslateService);


/***/ }),

/***/ 98803:
/*!**********************************!*\
  !*** ./src/app/services/user.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User),
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 54350);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
var _class;



 // change to new RxJS 6 import syntax

let UserService = (_class = class UserService {
  constructor(http) {
    this.http = http;
    this.urlPrefix = '';
    this.endpoint = '/user/';
    this.urlPrefix = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + this.endpoint;
  }
  getCount() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + 'count'));
  }
  getItems() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix));
  }
  getItem(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + id));
  }
  queryItems(query) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.get(this.urlPrefix + '?query=' + JSON.stringify(query)));
  }
  updatetItem(id, item) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(this.http.put(this.urlPrefix + id, item));
  }
}, _class.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient
}], _class);
UserService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
  providedIn: 'root'
})], UserService);

class User {}

/***/ }),

/***/ 26943:
/*!**********************************************!*\
  !*** ./src/app/views/error/404.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P404Component": () => (/* binding */ P404Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _404_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./404.component.html?ngResource */ 57162);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
var _class;




let P404Component = (_class = class P404Component {
  constructor(translate) {
    this.translate = translate;
  }
}, _class.ctorParameters = () => [{
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_1__.TranslateService
}], _class);
P404Component = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  template: _404_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], P404Component);


/***/ }),

/***/ 98743:
/*!**********************************************!*\
  !*** ./src/app/views/error/500.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P500Component": () => (/* binding */ P500Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _500_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./500.component.html?ngResource */ 71682);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
var _class;



let P500Component = (_class = class P500Component {
  constructor() {}
}, _class.ctorParameters = () => [], _class);
P500Component = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  template: _500_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], P500Component);


/***/ }),

/***/ 93:
/*!************************************************!*\
  !*** ./src/app/views/login/login.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _login_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component.html?ngResource */ 50514);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_helper/validator_hp */ 68628);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ 37556);
/* harmony import */ var _services_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user */ 98803);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
var _class;










let LoginComponent = (_class = class LoginComponent {
  constructor(authService, router, route, toastService, formBuilder, validationHelper, translate) {
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.toastService = toastService;
    this.formBuilder = formBuilder;
    this.validationHelper = validationHelper;
    this.translate = translate;
    this.user = {
      email: null,
      password: null
    };
    this.errorInUserCreate = false;
    this.alreadyLoggedIn = false;
    this.vh = validationHelper;
    this.alreadyLoggedIn = this.authService.isAuthenticated();
    this.createUser = new _services_user__WEBPACK_IMPORTED_MODULE_3__.User();
  }
  ngOnInit() {
    this.initLoginForm();
    this.setLang();
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email]),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])
    });
  }
  signInWithEmail(userForm) {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login({
      email: userForm.value["email"],
      password: userForm.value["password"]
    }).subscribe(res => {
      if (res['status'] == 'Error') {
        this.toastService.error(res.status, res.message);
        return;
      }
      this.authService.setUser(res['data'], res['accessToken']);
      this.toastService.success("Authentication Success", "Logging in please wait");
      const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
      setTimeout(router => {
        this.router.navigate([returnUrl || "/"]);
      }, 1500);
      this.router.navigate(["/"]);
    }, error => {
      console.log(error);
    });
  }
  logout() {
    this.authService.logout();
    this.alreadyLoggedIn = this.authService.isAuthenticated();
  }
  setLang() {
    let rtlSwitcherIsChecked = localStorage.getItem('rtl') || 'ع';
    let lang = rtlSwitcherIsChecked == 'ع' ? 'en' : 'ar';
    this.translate.use(lang).then(() => {});
  }
}, _class.ctorParameters = () => [{
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute
}, {
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__.ToastrService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormBuilder
}, {
  type: _helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__.ValidationHelper
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_4__.TranslateService
}], _class);
LoginComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-login',
  template: _login_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  providers: []
})], LoginComponent);


/***/ }),

/***/ 60193:
/*!******************************************************!*\
  !*** ./src/app/views/register/register.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterComponent": () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _register_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.component.html?ngResource */ 13956);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_helper/validator_hp */ 68628);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ 37556);
/* harmony import */ var _services_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user */ 98803);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ 94817);
/* harmony import */ var _services_translate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/translate.service */ 21662);
var _class;










let RegisterComponent = (_class = class RegisterComponent {
  constructor(authService, router, route, toastService, formBuilder, validationHelper, translate) {
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.toastService = toastService;
    this.formBuilder = formBuilder;
    this.validationHelper = validationHelper;
    this.translate = translate;
    this.user = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      rpassword: null
    };
    this.feedbackInUserCreate = false;
    this.feedbackType = '';
    this.vh = validationHelper;
    this.createUser = new _services_user__WEBPACK_IMPORTED_MODULE_3__.User();
  }
  ngOnInit() {
    this.initLoginForm();
    this.setLang();
  }
  signup(userForm) {
    this.feedbackInUserCreate = false;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register({
      firstName: userForm.value["firstName"],
      lastName: userForm.value["lastName"],
      email: userForm.value["email"],
      password: userForm.value["password"]
    }).subscribe(res => {
      console.log(res);
      this.feedbackInUserCreate = true;
      this.feedbackType = res.status == 'Error' ? 'danger' : 'success';
      this.feedbackMessage = res.message;
      if (res.status != 'Error') {
        this.toastService.success("Registeration Success", "Logging in please wait");
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 1000); //1s
      }
    }, error => {
      this.toastService.error("Registeration Failed!", error);
    });
  }
  initLoginForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]),
      lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]),
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email]),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.minLength(6)]),
      rpassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])
    }, {
      validator: (0,_helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__.MustMatch)('password', 'rpassword')
    });
  }
  setLang() {
    let rtlSwitcherIsChecked = localStorage.getItem('rtl') || 'ع';
    let lang = rtlSwitcherIsChecked == 'ع' ? 'en' : 'ar';
    this.translate.use(lang).then(() => {});
  }
}, _class.ctorParameters = () => [{
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute
}, {
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__.ToastrService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormBuilder
}, {
  type: _helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__.ValidationHelper
}, {
  type: _services_translate_service__WEBPACK_IMPORTED_MODULE_4__.TranslateService
}], _class);
RegisterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-register',
  template: _register_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  providers: []
})], RegisterComponent);


/***/ }),

/***/ 5572:
/*!************************************************!*\
  !*** ./src/app/views/reset/reset.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResetComponent": () => (/* binding */ ResetComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reset_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset.component.html?ngResource */ 52253);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_helper/validator_hp */ 68628);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ 37556);
/* harmony import */ var _services_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user */ 98803);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ 94817);
var _class;









let ResetComponent = (_class = class ResetComponent {
  constructor(authService, router, route, toastService, formBuilder, validationHelper) {
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.toastService = toastService;
    this.formBuilder = formBuilder;
    this.validationHelper = validationHelper;
    this.user = {
      email: null,
      password: null,
      rpassword: null
    };
    this.feedbackInReset = false;
    this.feedbackType = '';
    this.token = '';
    this.mode = 'request';
    this.vh = validationHelper;
    this.createUser = new _services_user__WEBPACK_IMPORTED_MODULE_3__.User();
  }
  ngOnInit() {
    this.initRequestForm();
    this.initResetForm();
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.token = params['token'];
      if (this.mode == 'reset' && this.token == undefined) {
        this.router.navigate(["/"]);
      }
    });
  }
  initRequestForm() {
    this.requestForm = this.formBuilder.group({
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email])
    });
  }
  request(userForm) {
    this.feedbackInReset = false;
    if (this.requestForm.invalid) {
      return;
    }
    this.authService.forgetPassword({
      email: userForm.value["email"]
    }).subscribe(res => {
      this.feedbackInReset = true;
      this.feedbackType = res.status == 'Error' ? 'danger' : 'success';
      this.feedbackMessage = res.message || "Link has been sent to your email";
      if (res.status != 'Error') {
        this.toastService.success("Email sent", "Link has been sent to your email");
      }
    }, error => {
      this.toastService.error("Reset Failed!", error);
    });
  }
  initResetForm() {
    this.resetForm = this.formBuilder.group({
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email]),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(6)]),
      rpassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required])
    }, {
      validator: (0,_helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__.MustMatch)('password', 'rpassword')
    });
  }
  reset(userForm) {
    this.feedbackInReset = false;
    if (this.resetForm.invalid) {
      return;
    }
    this.authService.resetPassword({
      email: userForm.value["email"],
      password: userForm.value["password"],
      token: this.token
    }).subscribe(res => {
      this.feedbackInReset = true;
      this.feedbackType = res.status == 'Error' ? 'danger' : 'success';
      this.feedbackMessage = res.message || "Passwrd has reseted successfully";
      if (res.status != 'Error') {
        this.toastService.success("Reset Success", "Passwrd has reseted successfully");
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 1000); //1s
      }
    }, error => {
      this.toastService.error("Reset Failed!", error);
    });
  }
}, _class.ctorParameters = () => [{
  type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute
}, {
  type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder
}, {
  type: _helper_validator_hp__WEBPACK_IMPORTED_MODULE_1__.ValidationHelper
}], _class);
ResetComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-reset',
  template: _reset_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  providers: []
})], ResetComponent);


/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
  production: false,
  baseUrl: 'api/v1'
};

/***/ }),

/***/ 9332:
/*!***********************************!*\
  !*** ./src/guards/admin.guard.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminGuard": () => (/* binding */ AdminGuard)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/services/auth.service */ 37556);
var _class;





let AdminGuard = (_class = class AdminGuard {
  constructor(router, route, authService) {
    this.router = router;
    this.route = route;
    this.authService = authService;
  }
  canActivate(route, state) {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      // not admin so redirect to home page
      this.router.navigateByUrl('/');
      return false;
    }
  }
}, _class.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.ActivatedRoute
}, {
  type: _app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService
}], _class);
AdminGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], AdminGuard);


/***/ }),

/***/ 46982:
/*!**********************************!*\
  !*** ./src/guards/auth.guard.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuard": () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/services/auth.service */ 37556);
var _class;





let AuthGuard = (_class = class AuthGuard {
  constructor(router, route, authService) {
    this.router = router;
    this.route = route;
    this.authService = authService;
  }
  canActivate(route, state) {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // not logged in so redirect to login page
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}, _class.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.ActivatedRoute
}, {
  type: _app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService
}], _class);
AuthGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], AuthGuard);


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 76057);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule, {
  useJit: true,
  preserveWhitespaces: true
}).catch(err => console.log(err));

/***/ }),

/***/ 62165:
/*!***********************************************************************!*\
  !*** ./src/app/components/analysis/analysis.component.css?ngResource ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 79578:
/*!*************************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.css?ngResource ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".card-header-custom{\n    font-size: 4rem;\n}\n\n.status-normal{\n    background-color: #4dbd74;\n}\n\n.status-low{\n    background-color: #f0ad4e;\n}\n\n.status-medium{\n    background-color: #ff8d00;   \n}\n\n.status-high{\n    background-color: #d9534f;\n}\n\n.status-critical{\n    background-color: rgb(139, 2, 2);\n}\n\n.brand-card-header-custom {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.25rem 0.25rem 0 0;\n    \n    display: flex;\n    flex-direction: row;\n    padding: 0.30rem 0;\n    text-align: center;\n}\n\n.dropdown-item-icon-custom {\n    font-size: 1.1rem;\n}\n\n.dropdown-trigger-icon-custom {\n    font-size: 1.1rem;\n}\n\n.gauge-chart__label{\n    font-size: 1.3125rem;\n}\n\n.brand-card-header-item-custom {\n    font-size: 1rem;\n}", "",{"version":3,"sources":["webpack://./src/app/components/dashboard/dashboard.component.css"],"names":[],"mappings":"AAAA;IACI,eAAe;AACnB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,kCAAkC;;IAElC,aAAa;IACb,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,eAAe;AACnB","sourcesContent":[".card-header-custom{\n    font-size: 4rem;\n}\n\n.status-normal{\n    background-color: #4dbd74;\n}\n\n.status-low{\n    background-color: #f0ad4e;\n}\n\n.status-medium{\n    background-color: #ff8d00;   \n}\n\n.status-high{\n    background-color: #d9534f;\n}\n\n.status-critical{\n    background-color: rgb(139, 2, 2);\n}\n\n.brand-card-header-custom {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.25rem 0.25rem 0 0;\n    \n    display: flex;\n    flex-direction: row;\n    padding: 0.30rem 0;\n    text-align: center;\n}\n\n.dropdown-item-icon-custom {\n    font-size: 1.1rem;\n}\n\n.dropdown-trigger-icon-custom {\n    font-size: 1.1rem;\n}\n\n.gauge-chart__label{\n    font-size: 1.3125rem;\n}\n\n.brand-card-header-item-custom {\n    font-size: 1rem;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 94522:
/*!*******************************************************************!*\
  !*** ./src/app/components/device/device.component.css?ngResource ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.form-control-custom:hover {\n    background-color: #e8dcff;\n    border-color: #6f42c1;\n    color: #6f42c1;\n}\n\n.form-control-custom:active {\n    background-color: #cbfcdc;\n    border-color: #4dbd74;\n    color: #4dbd74;\n}\n\n\n.multiple_emails-ul{\n    list-style-type: none;\n    margin-top: -2px;\n    border-top: none;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/app/components/device/device.component.css"],"names":[],"mappings":";AACA;IACI,yBAAyB;IACzB,qBAAqB;IACrB,cAAc;AAClB;;AAEA;IACI,yBAAyB;IACzB,qBAAqB;IACrB,cAAc;AAClB;;;AAGA;IACI,qBAAqB;IACrB,gBAAgB;IAChB,gBAAgB;IAChB,yBAAyB;IACzB,0BAA0B;AAC9B","sourcesContent":["\n.form-control-custom:hover {\n    background-color: #e8dcff;\n    border-color: #6f42c1;\n    color: #6f42c1;\n}\n\n.form-control-custom:active {\n    background-color: #cbfcdc;\n    border-color: #4dbd74;\n    color: #4dbd74;\n}\n\n\n.multiple_emails-ul{\n    list-style-type: none;\n    margin-top: -2px;\n    border-top: none;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 54565:
/*!***************************************************************!*\
  !*** ./src/app/components/home/home.component.css?ngResource ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 42794:
/*!*****************************************************************************************!*\
  !*** ./src/app/components/profile/avatar-update/avatar-update.component.css?ngResource ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".avatar-preview{\n    width: 50%;\n    height: 50%;\n    border-style: dashed;\n    border-color: #20a8d8;\n    background-color: #cccccc;\n}", "",{"version":3,"sources":["webpack://./src/app/components/profile/avatar-update/avatar-update.component.css"],"names":[],"mappings":"AAAA;IACI,UAAU;IACV,WAAW;IACX,oBAAoB;IACpB,qBAAqB;IACrB,yBAAyB;AAC7B","sourcesContent":[".avatar-preview{\n    width: 50%;\n    height: 50%;\n    border-style: dashed;\n    border-color: #20a8d8;\n    background-color: #cccccc;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 76164:
/*!*********************************************************************!*\
  !*** ./src/app/components/profile/profile.component.css?ngResource ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.overlap {\n    position: absolute;\n    transform: translateX(-20px);\n    transform: translateY(-50px);\n}\n\n.overlap:hover {\n    color: #4dbd74;\n}", "",{"version":3,"sources":["webpack://./src/app/components/profile/profile.component.css"],"names":[],"mappings":";AACA;IACI,kBAAkB;IAClB,4BAA4B;IAC5B,4BAA4B;AAChC;;AAEA;IACI,cAAc;AAClB","sourcesContent":["\n.overlap {\n    position: absolute;\n    transform: translateX(-20px);\n    transform: translateY(-50px);\n}\n\n.overlap:hover {\n    color: #4dbd74;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 92328:
/*!***********************************************************************!*\
  !*** ./src/app/components/settings/settings.component.css?ngResource ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 42433:
/*!***************************************************************!*\
  !*** ./src/app/components/user/user.component.css?ngResource ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 27659:
/*!************************************************************************!*\
  !*** ./src/app/components/rd-table/rd-table.component.scss?ngResource ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 49579);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60931);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*$primary: #0be3df;\n$shadow: rgba(11,227,223,.1);\n$red: red;\n\ntbody tr:nth-of-type(odd){\n    background-color: $shadow\n}\n\n.ngx-pagination .current{\n    background: $primary;\n    border: $primary;\n}\n\n.ngx-pagination li.current{\n    border: $primary;\n}\n\n.modal-open .modal{\n    z-index: 2050;\n}\n\n.alert-modal .modal-title {\n    color: $red;\n  }*/\ntable > tbody > tr:hover {\n  color: black;\n}", "",{"version":3,"sources":["webpack://./src/app/components/rd-table/rd-table.component.scss","webpack://./../../Mansoob%20V2/mansoob-ui/src/app/components/rd-table/rd-table.component.scss"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;IAAA;AAyBA;EACM,YAAA;ACAN","sourcesContent":["/*$primary: #0be3df;\n$shadow: rgba(11,227,223,.1);\n$red: red;\n\ntbody tr:nth-of-type(odd){\n    background-color: $shadow\n}\n\n.ngx-pagination .current{\n    background: $primary;\n    border: $primary;\n}\n\n.ngx-pagination li.current{\n    border: $primary;\n}\n\n.modal-open .modal{\n    z-index: 2050;\n}\n\n.alert-modal .modal-title {\n    color: $red;\n  }*/\ntable > tbody > tr:hover {\n  color: black;\n}","/*$primary: #0be3df;\n$shadow: rgba(11,227,223,.1);\n$red: red;\n\ntbody tr:nth-of-type(odd){\n    background-color: $shadow\n}\n\n.ngx-pagination .current{\n    background: $primary;\n    border: $primary;\n}\n\n.ngx-pagination li.current{\n    border: $primary;\n}\n\n.modal-open .modal{\n    z-index: 2050;\n}\n\n.alert-modal .modal-title {\n    color: $red;\n  }*/\ntable > tbody > tr:hover {\n  color: black;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 46700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 58685,
	"./af.js": 58685,
	"./ar": 254,
	"./ar-dz": 4312,
	"./ar-dz.js": 4312,
	"./ar-kw": 32614,
	"./ar-kw.js": 32614,
	"./ar-ly": 18630,
	"./ar-ly.js": 18630,
	"./ar-ma": 28674,
	"./ar-ma.js": 28674,
	"./ar-sa": 49032,
	"./ar-sa.js": 49032,
	"./ar-tn": 24730,
	"./ar-tn.js": 24730,
	"./ar.js": 254,
	"./az": 53052,
	"./az.js": 53052,
	"./be": 60150,
	"./be.js": 60150,
	"./bg": 63069,
	"./bg.js": 63069,
	"./bm": 13466,
	"./bm.js": 13466,
	"./bn": 18516,
	"./bn-bd": 90557,
	"./bn-bd.js": 90557,
	"./bn.js": 18516,
	"./bo": 26273,
	"./bo.js": 26273,
	"./br": 9588,
	"./br.js": 9588,
	"./bs": 19815,
	"./bs.js": 19815,
	"./ca": 83331,
	"./ca.js": 83331,
	"./cs": 21320,
	"./cs.js": 21320,
	"./cv": 72219,
	"./cv.js": 72219,
	"./cy": 68266,
	"./cy.js": 68266,
	"./da": 66427,
	"./da.js": 66427,
	"./de": 67435,
	"./de-at": 52871,
	"./de-at.js": 52871,
	"./de-ch": 12994,
	"./de-ch.js": 12994,
	"./de.js": 67435,
	"./dv": 82357,
	"./dv.js": 82357,
	"./el": 95649,
	"./el.js": 95649,
	"./en-au": 59961,
	"./en-au.js": 59961,
	"./en-ca": 19878,
	"./en-ca.js": 19878,
	"./en-gb": 3924,
	"./en-gb.js": 3924,
	"./en-ie": 70864,
	"./en-ie.js": 70864,
	"./en-il": 91579,
	"./en-il.js": 91579,
	"./en-in": 30940,
	"./en-in.js": 30940,
	"./en-nz": 16181,
	"./en-nz.js": 16181,
	"./en-sg": 44301,
	"./en-sg.js": 44301,
	"./eo": 85291,
	"./eo.js": 85291,
	"./es": 54529,
	"./es-do": 53764,
	"./es-do.js": 53764,
	"./es-mx": 12584,
	"./es-mx.js": 12584,
	"./es-us": 63425,
	"./es-us.js": 63425,
	"./es.js": 54529,
	"./et": 35203,
	"./et.js": 35203,
	"./eu": 70678,
	"./eu.js": 70678,
	"./fa": 83483,
	"./fa.js": 83483,
	"./fi": 96262,
	"./fi.js": 96262,
	"./fil": 52521,
	"./fil.js": 52521,
	"./fo": 34555,
	"./fo.js": 34555,
	"./fr": 63131,
	"./fr-ca": 88239,
	"./fr-ca.js": 88239,
	"./fr-ch": 21702,
	"./fr-ch.js": 21702,
	"./fr.js": 63131,
	"./fy": 267,
	"./fy.js": 267,
	"./ga": 23821,
	"./ga.js": 23821,
	"./gd": 71753,
	"./gd.js": 71753,
	"./gl": 4074,
	"./gl.js": 4074,
	"./gom-deva": 92762,
	"./gom-deva.js": 92762,
	"./gom-latn": 5969,
	"./gom-latn.js": 5969,
	"./gu": 82809,
	"./gu.js": 82809,
	"./he": 45402,
	"./he.js": 45402,
	"./hi": 315,
	"./hi.js": 315,
	"./hr": 10410,
	"./hr.js": 10410,
	"./hu": 38288,
	"./hu.js": 38288,
	"./hy-am": 67928,
	"./hy-am.js": 67928,
	"./id": 71334,
	"./id.js": 71334,
	"./is": 86959,
	"./is.js": 86959,
	"./it": 34864,
	"./it-ch": 51124,
	"./it-ch.js": 51124,
	"./it.js": 34864,
	"./ja": 36141,
	"./ja.js": 36141,
	"./jv": 29187,
	"./jv.js": 29187,
	"./ka": 42136,
	"./ka.js": 42136,
	"./kk": 94332,
	"./kk.js": 94332,
	"./km": 18607,
	"./km.js": 18607,
	"./kn": 84305,
	"./kn.js": 84305,
	"./ko": 70234,
	"./ko.js": 70234,
	"./ku": 16003,
	"./ku.js": 16003,
	"./ky": 75061,
	"./ky.js": 75061,
	"./lb": 32786,
	"./lb.js": 32786,
	"./lo": 66183,
	"./lo.js": 66183,
	"./lt": 50029,
	"./lt.js": 50029,
	"./lv": 24169,
	"./lv.js": 24169,
	"./me": 68577,
	"./me.js": 68577,
	"./mi": 68177,
	"./mi.js": 68177,
	"./mk": 50337,
	"./mk.js": 50337,
	"./ml": 65260,
	"./ml.js": 65260,
	"./mn": 52325,
	"./mn.js": 52325,
	"./mr": 14695,
	"./mr.js": 14695,
	"./ms": 75334,
	"./ms-my": 37151,
	"./ms-my.js": 37151,
	"./ms.js": 75334,
	"./mt": 63570,
	"./mt.js": 63570,
	"./my": 97963,
	"./my.js": 97963,
	"./nb": 88028,
	"./nb.js": 88028,
	"./ne": 86638,
	"./ne.js": 86638,
	"./nl": 50302,
	"./nl-be": 66782,
	"./nl-be.js": 66782,
	"./nl.js": 50302,
	"./nn": 33501,
	"./nn.js": 33501,
	"./oc-lnc": 50563,
	"./oc-lnc.js": 50563,
	"./pa-in": 50869,
	"./pa-in.js": 50869,
	"./pl": 65302,
	"./pl.js": 65302,
	"./pt": 49687,
	"./pt-br": 74884,
	"./pt-br.js": 74884,
	"./pt.js": 49687,
	"./ro": 79107,
	"./ro.js": 79107,
	"./ru": 33627,
	"./ru.js": 33627,
	"./sd": 30355,
	"./sd.js": 30355,
	"./se": 83427,
	"./se.js": 83427,
	"./si": 11848,
	"./si.js": 11848,
	"./sk": 54590,
	"./sk.js": 54590,
	"./sl": 20184,
	"./sl.js": 20184,
	"./sq": 56361,
	"./sq.js": 56361,
	"./sr": 78965,
	"./sr-cyrl": 81287,
	"./sr-cyrl.js": 81287,
	"./sr.js": 78965,
	"./ss": 25456,
	"./ss.js": 25456,
	"./sv": 70451,
	"./sv.js": 70451,
	"./sw": 77558,
	"./sw.js": 77558,
	"./ta": 51356,
	"./ta.js": 51356,
	"./te": 73693,
	"./te.js": 73693,
	"./tet": 21243,
	"./tet.js": 21243,
	"./tg": 42500,
	"./tg.js": 42500,
	"./th": 55768,
	"./th.js": 55768,
	"./tk": 77761,
	"./tk.js": 77761,
	"./tl-ph": 35780,
	"./tl-ph.js": 35780,
	"./tlh": 29590,
	"./tlh.js": 29590,
	"./tr": 33807,
	"./tr.js": 33807,
	"./tzl": 93857,
	"./tzl.js": 93857,
	"./tzm": 60654,
	"./tzm-latn": 8806,
	"./tzm-latn.js": 8806,
	"./tzm.js": 60654,
	"./ug-cn": 30845,
	"./ug-cn.js": 30845,
	"./uk": 19232,
	"./uk.js": 19232,
	"./ur": 47052,
	"./ur.js": 47052,
	"./uz": 77967,
	"./uz-latn": 32233,
	"./uz-latn.js": 32233,
	"./uz.js": 77967,
	"./vi": 98615,
	"./vi.js": 98615,
	"./x-pseudo": 12320,
	"./x-pseudo.js": 12320,
	"./yo": 31313,
	"./yo.js": 31313,
	"./zh-cn": 64490,
	"./zh-cn.js": 64490,
	"./zh-hk": 55910,
	"./zh-hk.js": 55910,
	"./zh-mo": 98262,
	"./zh-mo.js": 98262,
	"./zh-tw": 44223,
	"./zh-tw.js": 44223
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46700;

/***/ }),

/***/ 1324:
/*!************************************************************************!*\
  !*** ./src/app/components/analysis/analysis.component.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<p>analysis works!</p>\n";

/***/ }),

/***/ 17182:
/*!**************************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div id=\"dashboard\" class=\"animated fadeIn\">\n    <!-- Outdated alert message -->\n    <div *ngIf=\"isOutDated()\" class=\"row\">\n        <div class=\"col-sm-6 col-lg-12\">\n            <alert type=\"isOutDated()\">\n                <div role=\"alert\" class=\"alert alert-{{isOutDated()}} ng-star-inserted\">\n                    <strong>{{ this.translate.data[\"LastUpdate\"] }}:</strong> {{ formatDate(time,'dddd Do MMMM, YYYY HH:mm') }}\n                </div>\n            </alert>\n        </div>\n    </div>\n    <div class=\"row\">\n        <!-- level card -->\n        <div class=\"col-sm-6 col-lg-5\">\n            <div class=\"brand-card\">\n                <div class=\"brand-card-header {{severity_class}}\">\n                    <i class=\"card-header-custom fa {{severity_simple}}\"></i>\n                    <div class=\"chart-wrapper\">\n                        <div class=\"m-3 float-left\" dropdown>\n                            <span class=\"text-white\">{{ formatDate(time,'YYYY-MM-DD') }}</span>\n                            <br />\n                            <span class=\"text-white\">{{ formatDate(time,'HH:mm:SS') }}</span>\n                            <br />\n                            <p class=\"text-muted mt-1\">Device id: {{ device_id }}</p>\n                        </div>\n                        <div class=\"btn-group m-3 float-right\" dropdown>\n                            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" dropdownToggle>\n                                <i class=\"dropdown-trigger-icon-custom icon-settings p-0\"></i>\n                            </button>\n                            <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu>\n                                <div class=\"dropdown-header text-center\"><strong> {{ this.translate.data[\"TOOLS\"] }}</strong></div>\n                                <a class=\"dropdown-item\" (click)=\"refreshContent()\" [routerLink]=\"\"><i\n                                    class=\"dropdown-item-icon-custom fa fa-refresh text-primary\"></i>\n                                    {{ this.translate.data[\"RefreshNow\"] }}</a>\n                                <a class=\"dropdown-item\" [routerLink]=\"\" shareButton=\"whatsapp\" title=\"Mansoob Current Status\"\n                                    description=\"The severity level of the tank reaches the {{severity}} state ({{currentLevel}})\"><i\n                                        class=\"dropdown-item-icon-custom fa fa-whatsapp text-success\"></i>\n                                        {{ this.translate.data[\"ShareonWhatsApp\"] }}</a>\n                                <a class=\"dropdown-item\" (click)=\"genPDF('dashboard')\" [routerLink]=\"\"><i\n                                        class=\"dropdown-item-icon-custom icon-cloud-download text-primary\"></i>\n                                        {{ this.translate.data[\"DownlaodDashboardasPDF\"] }}</a>\n                                <a class=\"dropdown-item\" (click)=\"infoModal.show()\" data-toggle=\"modal\" [routerLink]=\"\"><i\n                                        class=\"dropdown-item-icon-custom icon-info text-info\"></i>\n                                        {{ this.translate.data[\"QuickInformation\"] }}</a>\n                                <div class=\"dropdown-header text-center\"><strong>{{ this.translate.data[\"RefreshInterval\"] }}</strong></div>\n                                <a class=\"dropdown-item {{isRefreshInterval(5)?'active':''}}\" [routerLink]=\"\"\n                                    (click)=\"setRefreshInterval(5)\">5 minutes</a>\n                                <a class=\"dropdown-item {{isRefreshInterval(10)?'active':''}}\" [routerLink]=\"\"\n                                    (click)=\"setRefreshInterval(10)\">10 Minutes</a>\n                                <a class=\"dropdown-item {{isRefreshInterval(20)?'active':''}}\" [routerLink]=\"\"\n                                    (click)=\"setRefreshInterval(20)\">20 Minutes</a>\n                                <a class=\"dropdown-item {{isRefreshInterval(30)?'active':''}}\" [routerLink]=\"\"\n                                    (click)=\"setRefreshInterval(30)\">30 Minutes</a>\n                                <a class=\"dropdown-item {{isRefreshInterval(60)?'active':''}}\" [routerLink]=\"\"\n                                    (click)=\"setRefreshInterval(60)\">1 Hour</a>\n                                <a class=\"dropdown-item {{isRefreshInterval('M')?'active':''}}\" [routerLink]=\"\"\n                                    (click)=\"setRefreshInterval('M')\">Manually</a>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n                <div class=\"brand-card-body\">\n                    <div>\n                        <div class=\"text-value\">{{currentLevel}}</div>\n                        <div class=\"text-uppercase text-muted small\">{{ severity }} {{ this.translate.data[\"Status\"] }}</div>\n                    </div>\n                    <div>\n                        <div class=\"text-value\">{{currentLevel_percentage}}</div>\n                        <div class=\"text-uppercase text-muted small\">{{ this.translate.data[\"CurrentStatus%\"] }}</div>\n                    </div>\n                    <div>\n                        <div class=\"text-value\">{{currentCapacity}}</div>\n                        <div class=\"text-uppercase text-muted small\">m3</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Gauge Chart -->\n        <div class=\"col-sm-6 col-lg-3\">\n            <div class=\"brand-card\">\n                <div class=\" brand-card-header-custom\">\n                    <div class=\"chart-wrapper\">\n                        <rg-gauge-chart [canvasWidth]=\"canvasWidth\" [needleValue]=\"gaugeNeedleValue\"\n                            [centralLabel]=\"centralLabel\" [name]=\"name\" [options]=\"options\"\n                            [bottomLabel]=\"currentLevel\"></rg-gauge-chart>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"col-sm-6 col-lg-4\">\n            <div class=\"brand-card\">\n                <div class=\"brand-card-header bg-primary\">\n                    <i class=\"card-header-custom fa fa-bullhorn float-left\"></i>\n                    <div class=\"ml-3\">\n                        <div class=\"brand-card-header-item-custom\">{{ this.translate.data[\"TimetoRefill\"] }} <strong>{{ timeToRefill }}</strong>\n                            day(s)</div>\n                        <div class=\"brand-card-header-item-custom\">{{ this.translate.data[\"On\"] }} <strong>{{ dayToRefill }}</strong></div>\n                    </div>\n                </div>\n                <!-- Consumption card -->\n                <div class=\"brand-card-body\">\n                    <div>\n                        <div class=\"text-value\">{{ fixIfNaN(getRoundedNumber(dConsLst[4],tankHeight)) }}%</div>\n                        <div class=\"text-uppercase text-muted small\">{{ this.translate.data[\"TodayConsumption\"] }}</div>\n                    </div>\n                    <!-- Yesterday Consumption CARD -->\n                    <div>\n                        <div class=\"text-value\"><i class=\"card-header-custom fa fa-alert\"></i>{{ dConsLst[5]}} \n                            ({{ fixIfNaN(getRoundedNumber(dConsLst[5],tankHeight)) }})%</div>\n                        <div class=\"text-uppercase text-muted small\">{{ this.translate.data[\"YesterdayConsumption\"] }}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!--/.row-->\n\n    <!-- Wate level chart-->\n    <div id=\"waterLevelChart\" class=\"card\">\n        <div class=\"card-header\">\n            <div class=\"row text-center\">\n                <div class=\"col-sm-12 col-md mb-sm-2 mb-0\">\n                    <div class=\"text-muted\">{{ this.translate.data[\"TodayFirstQuarter\"] }}</div><strong>{{dConsLst[0]}}\n                        ({{dConsPercLst[0]}})%</strong>\n                    <div class=\"progress progress-xs mt-2\">\n                        <div id=\"q1ProgressBar\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\"40\"\n                            class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 40%\"></div>\n                    </div>\n                </div>\n                <div class=\"col-sm-12 col-md mb-sm-2 mb-0\">\n                    <div class=\"text-muted\">{{ this.translate.data[\"TodaySecondQuarter\"] }}</div><strong>{{dConsLst[1]}}\n                        ({{dConsPercLst[1]}})%</strong>\n                    <div class=\"progress progress-xs mt-2\">\n                        <div id=\"q2ProgressBar\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\"20\"\n                            class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 20%\"></div>\n                    </div>\n                </div>\n                <div class=\"col-sm-12 col-md mb-sm-2 mb-0\">\n                    <div class=\"text-muted\">{{ this.translate.data[\"TodayThirdQuarter\"] }}</div><strong>{{dConsLst[2]}}\n                        ({{dConsPercLst[2]}})%</strong>\n                    <div class=\"progress progress-xs mt-2\">\n                        <div id=\"q3ProgressBar\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\"60\"\n                            class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 60%\"></div>\n                    </div>\n                </div>\n                <div class=\"col-sm-12 col-md mb-sm-2 mb-0\">\n                    <div class=\"text-muted\">{{ this.translate.data[\"TodayFourthQuarter\"] }}</div><strong>{{dConsLst[3]}}\n                        ({{dConsPercLst[3]}})%</strong>\n                    <div class=\"progress progress-xs mt-2\">\n                        <div id=\"q4ProgressBar\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\"80\"\n                            class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 80%\"></div>\n                    </div>\n                </div>\n                <div class=\"col-sm-12 col-md mb-sm-2 mb-0\">\n                    <div class=\"text-muted\">{{ this.translate.data[\"TodayConsumption\"] }}</div><strong>{{dConsLst[4]}}\n                        ({{ fixIfNaN(getRoundedNumber(dConsPercLst[4]/100,tankCapacity)) }})m3</strong>\n                    <div class=\"progress progress-xs mt-2\">\n                        <div id=\"q5ProgressBar\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\"40\"\n                            class=\"progress-bar\" role=\"progressbar\" style=\"width: 40%\"></div>\n                    </div>\n                </div>\n                <div class=\"col-sm-12 col-md mb-sm-2 mb-0\">\n                    <div class=\"text-muted\">{{ this.translate.data[\"AvgConsumption\"] }}</div><strong>\n                        ({{ fixIfNaN(getRoundedNumber(averageConsumption/100,100)) }})cm</strong>\n\n                </div>\n            </div>\n        </div>\n\n        <!--  WATER LEVEL LINE CHARTS-->\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <div class=\"col-sm-5\">\n                    <h4 class=\"card-title mb-0\">{{ this.translate.data[\"WaterLevel\"] }}</h4>\n                    <div class=\"small text-muted\">{{formatDate(time,'dddd Do MMMM, YYYY')}}</div>\n                </div>\n                <!--/.col-->\n                <div class=\"col-sm-7 d-none d-md-block\">\n                    <button type=\"button\" class=\"btn btn-primary float-right\" (click)=\"genPDF('waterLevelChart')\"><i\n                            class=\"icon-cloud-download\"></i></button>\n                    <div class=\"btn-group btn-group-toggle float-right mr-3\" data-toggle=\"buttons\">\n                        <label class=\"btn btn-outline-secondary\" [(ngModel)]=\"radioModel\" (click)=\"getReadingData(140)\"\n                            btnRadio=\"6\" id=\"option1\">6 hrs</label>\n                        <label class=\"btn btn-outline-secondary\" [(ngModel)]=\"radioModel\" (click)=\"getReadingData(280)\"\n                            btnRadio=\"24\" id=\"option2\">24 hrs</label>\n                    </div>\n                </div>\n                <!--/.col-->\n            </div>\n            <!--/.row-->\n            <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n                <canvas #readingChart baseChart class=\"chart\" [datasets]=\"readingChartDataset\"\n                    [labels]=\"readingChartLabels\" [options]=\"readingChartOptions\" [colors]=\"readingChartDatasetColors\"\n                    [chartType]=\"readingChartType\" [legend]=\"readingChartLegend\"></canvas>\n            </div>\n        </div>\n\n    </div>\n\n    <!-- Consumption  chart-->\n    <div id=\"consChartArea\" class=\"card\">\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <div class=\"col-sm-5\">\n                    <h4 class=\"card-title mb-0\">{{ this.translate.data[\"Consumption\"] }}</h4>\n                    <div class=\"small text-muted\">\n                        {{formatDate(consChartLabels[0],'Do MMMM, YYYY')}} -\n                        {{formatDate(consChartLabels[consChartLabels.length-1],'Do MMMM, YYYY')}}\n                    </div>\n                </div>\n                <!--/.col-->\n                <div class=\"col-sm-7 d-none d-md-block\">\n                    <button type=\"button\" class=\"btn btn-primary float-right\" (click)=\"genPDF('consChartArea')\"><i\n                            class=\"icon-cloud-download\"></i></button>\n                    <div class=\"btn-group btn-group-toggle float-right mr-3\" data-toggle=\"buttons\">\n\n                    </div>\n                </div>\n                <!--/.col-->\n            </div>\n            <!--/.row-->\n            <div class=\"chart-wrapper\" style=\"position: relative; height:300px; margin-top:40px;\">\n                <canvas #consChart baseChart class=\"chart\" [datasets]=\"consChartDataset\" [labels]=\"consChartLabels\"\n                    [options]=\"consChartOptions\" [chartType]=\"consChartType\" [legend]=\"consChartLegend\"></canvas>\n            </div>\n        </div>\n\n    </div>\n\n\n</div>\n\n<!-- info modal -->\n<div bsModal #infoModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-info\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">\n                    <i class=\"fa  fa-info-circle fa-1x\"></i>\n                    {{ this.translate.data[\"WaterLevelQuickInformation\"] }}</h4>\n                <button type=\"button\" class=\"close\" (click)=\"infoModal.hide()\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n\n                <div class=\"panel-heading text-left\">\n                    <ul>\n                        <li>{{ this.translate.data[\"TankFullLevel:135,\"] }} <strong>({{ this.translate.data[\"Normalstatus\"] }})</strong></li>\n                        <li>{{ this.translate.data[\"RefillLevel:74.5\"] }} <strong>({{ this.translate.data[\"Lowstatus\"] }})</strong></li>\n                        <li>{{ this.translate.data[\"TankEmptyLevel:17,\"] }} <strong>({{ this.translate.data[\"Criticalstatus\"] }})</strong></li>\n                    </ul>\n                </div>\n\n                <br>\n                <div class=\"panel-heading text-left\">\n                    {{ this.translate.data[\"SeverityLevels\"] }}:\n                    <div class=\"progress mt-2\">\n                        <div class=\"progress-bar status-normal progress-bar-striped active\" id=\"bar-normal\"\n                            role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                            style=\"width: 100%\">{{ this.translate.data[\"Normal\"] }}:</div>\n                    </div>\n                    <div class=\"progress mt-2\">\n                        <div class=\"progress-bar status-low progress-bar-striped\" id=\"bar-low\" role=\"progressbar\"\n                            aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%\">{{ this.translate.data[\"Low\"] }}:</div>\n                    </div>\n                    <div class=\"progress mt-2\">\n                        <div class=\"progress-bar status-medium progress-bar-striped\" id=\"bar-medium\" role=\"progressbar\"\n                            aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 33%\">{{ this.translate.data[\"Medium\"] }}:</div>\n                    </div>\n                    <div class=\"progress mt-2\">\n                        <div class=\"progress-bar status-high progress-bar-striped\" id=\"bar-high\" role=\"progressbar\"\n                            aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 25%\">{{ this.translate.data[\"High\"] }}:</div>\n                    </div>\n                    <div class=\"progress mt-2\">\n                        <div class=\"progress-bar status-critical progress-bar-striped\" id=\"bar-critical\"\n                            role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                            style=\"width: 16%\">{{ this.translate.data[\"Critical\"] }}:</div>\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"infoModal.hide()\">{{ this.translate.data[\"Dismiss\"] }}</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";

/***/ }),

/***/ 31927:
/*!********************************************************************!*\
  !*** ./src/app/components/device/device.component.html?ngResource ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"row\">\n  <div class=\"col-xl-6 col-lg-7 col-md-12\">\n    <div class=\"card\">\n      <div class=\"card-header\"><strong>{{ this.translate.data[\"Selectdevicefordetails\"] }}</strong></div>\n      <div class=\"card-body\">\n        <app-rd-table #table [options]=\"options\" [fields]=\"fields\" (recordSelected)=\"showDetials($event)\">\n        </app-rd-table>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-xl-6 col-lg-7 col-md-12\">\n    <div class=row>\n      <div class=\"col-xl-12 col-lg-12 col-md-12\">\n        <form [formGroup]=\"detialsForm\" (ngSubmit)=\"updateDetails()\">\n          <div class=\"card\">\n            <div class=\"card-header\"><strong>{{ this.translate.data[\"Details\"] }}</strong></div>\n            <div class=\"card-body\" *ngIf=\"recordSelected\">\n              <div class=\"form-group\">\n                <label for=\"company\">{{ this.translate.data[\"Name\"] }} </label>\n                <input class=\"form-control\" id=\"name\" placeholder=\"Enter name\" type=\"text\" [(ngModel)]=\"record['name']\"\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(detialsForm, 'name') }\" required formControlName=\"name\">\n                <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(detialsForm, 'name')\">\n                  {{ vh.getMsg(detialsForm,'name') }}\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"vat\">{{ this.translate.data[\"TankCapacity(m3)\"] }}</label>\n                <input class=\"form-control\" id=\"tank_capacity\" placeholder=\"8\" type=\"number\"\n                  [(ngModel)]=\"record['tank_capacity']\"\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(detialsForm, 'tank_capacity') }\" required\n                  formControlName=\"tank_capacity\">\n                <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(detialsForm, 'tank_capacity')\">\n                  {{ vh.getMsg(detialsForm,'tank_capacity') }}\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"street\">{{ this.translate.data[\"TankHieght(cm)\"] }}</label>\n                <input class=\"form-control\" id=\"tank_height\" placeholder=\"150\" type=\"number\"\n                  [(ngModel)]=\"record['tank_height']\"\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(detialsForm, 'tank_height') }\" required\n                  formControlName=\"tank_height\">\n                <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(detialsForm, 'tank_height')\">\n                  {{ vh.getMsg(detialsForm,'tank_height') }}\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"street\">{{ this.translate.data[\"Notify(EmailTo)\"] }}</label>\n                <!-- full multiple email controller -->\n                <input class=\"form-control\" id=\"email_to_input\" placeholder=\"Emails with comma seprated\" type=\"text\"\n                  [(ngModel)]=\"email_to_input\"  (focusout)=\"multipleEmailInput('email_to_input', 1, emails)\" formControlName=\"email_to_input\">\n\n                <input class=\"form-control\" id=\"email_to\" placeholder=\"\" type=\"text\" \n                  [(ngModel)]=\"record['email_to']\"\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(detialsForm, 'email_to') }\" required hidden\n                  formControlName=\"email_to\">\n\n                <div class=\"multiple_emails-ul form-control\">\n                  <span class=\"multiple_emails-email\" *ngFor=\"let email of emails\">\n                    <a  [routerLink]=\"\" (click)=\"removeEmailItem(email, 1, emails)\" class=\"multiple_emails-close\" title=\"Remove\">\n                      <span class=\"fa fa-remove\"></span>\n                    </a>\n                    <span class=\"email_name\" data-email=\"{{email}}\">\n                      {{email}}\n                    </span>\n                  </span>\n                </div>\n                <!-- end of full multiple email controller-->\n                <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(detialsForm, 'email_to')\">\n                  {{ vh.getMsg(detialsForm,'email_to') }}\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"form-group col-sm-10\"><label for=\"city\">Access Token</label>\n                  <input class=\"form-control form-control-custom\" id=\"access_token\" placeholder=\"\" type=\"text\" readonly\n                    value=\"here is some text\" (click)=\"copyToClipboard('access_token')\"\n                    [value]=\"record['access_token']\">\n                </div>\n                <div class=\"form-group col-sm-2\">\n                  <label for=\"postal-code\">{{ this.translate.data[\"Generate\"] }}</label>\n                  <button class=\"form-control btn btn-sm btn-warning\" id=\"access_token_generate\" type=\"button\"\n                    (click)=\"generateAccessToken()\">\n                    <i class=\"cui-brush icons font-2\"></i>\n                  </button>\n                </div>\n              </div>\n            </div>\n            <div class=\"card-footer\">\n              <button class=\"btn btn-sm btn-primary\" type=\"submit\" [disabled]=\"!detialsForm.valid\">\n                <i class=\"fa fa-dot-circle-o\"></i> {{ this.translate.data[\"Submit\"] }} \n              </button>\n              <button class=\"btn btn-sm btn-danger ml-3\" type=\"reset\" (click)=\"resetDetails()\">\n                <i class=\"fa fa-ban\"></i> {{ this.translate.data[\"Reset\"] }}  \n              </button>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12\">\n        <div class=\"card\">\n          <div class=\"card-header\"><strong>{{ this.translate.data[\"ShareDeviceDashboard\"] }}</strong></div>\n          <div class=\"card-body\" *ngIf=\"recordSelected\">\n            <div class=\"form-group\">\n              <label for=\"company\"></label>\n                <!-- full multiple email controller -->\n                <input class=\"form-control\" id=\"recordShared_string_input\" placeholder=\"Emails with comma seprated\" type=\"text\"\n                  [(ngModel)]=\"recordShared_emails_input\" \n                  (focusout)=\"multipleEmailInput('recordShared_string_input', 2, recordShared_emails)\">\n\n                  <input class=\"form-control\" id=\"shared\" placeholder=\"Enter ids comma seprated vallues\" \n                  type=\"text\" [(ngModel)]=\"recordShared_string\" hidden>\n\n                <div class=\"multiple_emails-ul form-control\">\n                  <span class=\"multiple_emails-email\" *ngFor=\"let email of recordShared_emails\">\n                    <a  [routerLink]=\"\" (click)=\"removeEmailItem(email, 2, recordShared_emails)\" class=\"multiple_emails-close\" title=\"Remove\">\n                      <span class=\"fa fa-remove\"></span>\n                    </a>\n                    <span class=\"email_name\" data-email=\"{{email}}\">\n                      {{email}}\n                    </span>\n                  </span>\n                </div>\n                <!-- end of full multiple email controller-->\n            </div>\n          </div>\n          <div class=\"card-footer\">\n            <button class=\"btn btn-sm btn-primary\" type=\"button\" (click)=\"updateShared()\">\n              <i class=\"fa fa-dot-circle-o\"></i> {{ this.translate.data[\"Submit\"] }} \n            </button>\n            <button class=\"btn btn-sm btn-danger ml-3\" type=\"reset\" (click)=\"resetShared()\">\n              <i class=\"fa fa-ban\"></i> {{ this.translate.data[\"Reset\"] }}  \n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>";

/***/ }),

/***/ 42403:
/*!****************************************************************!*\
  !*** ./src/app/components/home/home.component.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"row\">\n    <div *ngFor=\"let device of devices\" class=\"col-6 col-lg-3\">\n        <div class=\"card\">\n            <div class=\"card-body p-3 clearfix\">\n                <i *ngIf=\"device.type != shared\" class=\"icon-chart bg-success p-3 font-2xl mr-3 float-left\"></i>\n                <i *ngIf=\"device.type == shared\" class=\"icon-chart bg-warning p-3 font-2xl mr-3 float-left\"></i>\n                <div class=\"h5 mb-0 mt-2\">\n                    <span *ngIf=\"device.type == shared\" class=\"text-warning\">Shared: </span>\n                    {{device.name}}\n                </div>\n                <div class=\"text-muted text-uppercase font-weight-bold font-xs\">\n                    Level: {{device.level}}, Severity: {{device.severity}}</div>\n            </div>\n            <div class=\"card-footer px-3 py-2\">\n                <a class=\"font-weight-bold font-xs btn-block text-muted\" href=\"#\" [routerLink]=\"['/dashboard']\"\n                    [queryParams]=\"{device_id: device.id}\">\n                    View More\n                    <i class=\"fa fa-angle-right float-right font-lg\"></i>\n                </a>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"devices.length==0\" class=\"col-12\">\n        <alert type=\"info\">\n            <div role=\"alert\" class=\"alert alert-info\">\n                <strong>No such device found!</strong> You can add device from the \"device\" section.\n            </div>\n        </alert>\n    </div>\n</div>";

/***/ }),

/***/ 66702:
/*!******************************************************************************************!*\
  !*** ./src/app/components/profile/avatar-update/avatar-update.component.html?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"form-group row\">\n    <!-- selection button-->\n    <div class=\"col-12\">\n        <div class=\"input-group\">\n            <span class=\"input-group-prepend\">\n                <button class=\"btn btn-primary\" type=\"button\" (click)=\"fileInput.click()\">\n                    <i class=\"fa fa-upload\"></i> {{ this.translate.data[\"ChooseFile\"] }}\n                    <input type=\"file\" style=\"display:none;\" name=\"file\" #fileInput\n                        (change)=\"onChange(fileInput.files[0])\" class=\"form-control\">\n                </button>\n            </span>\n            <span class=\"form-control\">\n                {{ fileName }}\n            </span>\n        </div>\n    </div>\n    <!-- error area-->\n\n    <alert type=\"success\" class=\"mt-3 ml-3\" *ngIf=\"infoMessage && !isError\">\n        <div role=\"alert\" class=\"alert alert-success\">\n            <strong>{{ this.translate.data[\"Success\"] }}!</strong> {{ infoMessage }}\n        </div>\n    </alert>\n\n    <alert type=\"danger\" class=\"mt-3 ml-3\" *ngIf=\"isError\">\n        <div role=\"alert\" class=\"alert alert-danger\">\n            <strong>{{ this.translate.data[\"Error\"] }}!</strong> {{ infoMessage }}\n        </div>\n    </alert>\n    <!-- progress bar-->\n    <div class=\"col-12 mt-2\" *ngIf=\"!infoMessage\">\n        <div class=\"input-group\">\n            <progress class=\"progress is-primary\" [attr.value]=\"progress\" max=\"100\"></progress>\n        </div>\n    </div>\n    <!-- upload buton -->\n    <div class=\"col-12 mt-2\">\n        <div class=\"input-group\">\n            <button class=\"btn btn-primary\" (click)=\"onUpload()\" [attr.disabled]=\"isUploading ? '' : null\">\n                {{ this.translate.data[\"Upload\"] }}\n            </button>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"row\">\n    <div class=\"col-12\">\n        <figure class=\"input-group mr-2\">\n            <img class=\"avatar-preview\" [src]=\"imageUrl\" />\n        </figure>\n    </div>\n</div>";

/***/ }),

/***/ 84424:
/*!**********************************************************************!*\
  !*** ./src/app/components/profile/profile.component.html?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-xl-6 col-lg-7 col-md-12\">\n            <div class=\"card\">\n                <div class=\"card-body\">\n                    <div class=\"col-lg-2 col-md-2 col-sm-6\">\n                        <div class=\"float-lg-left\">\n                            <ngx-avatar size=\"100\" src=\"http://yousefcave.com/uploads/avatars/{{user.id}}-avatar.png\"\n                                name=\"{{user.name}}\">\n                            </ngx-avatar>\n                            <button type=\"button\" class=\" btn btn-transparent fa fa-camera overlap\"\n                                (click)=\"updateAvatarModal.show()\">\n                            </button>\n                        </div>\n\n                    </div>\n                    <div class=\"col-lg-10 col-md-10 col-sm-6\">\n                        <div class=\"float-left m-3\">\n                            <h4 class=\"m-t-0 m-b-0\">{{ user.name }}</h4>\n                            <p>{{ this.translate.data[\"LoginId\"] }}: <strong>{{ user.email }}</strong></p>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n            <div class=\"card\">\n                <form [formGroup]=\"profileForm\" (ngSubmit)=\"updateDetails()\">\n                    <div class=\"card-body\" id=\"about\">\n                        <small class=\"text-muted\">{{ this.translate.data[\"FirstName\"] }}: </small>\n                        <p *ngIf=\"mode!='edit'\">{{ user.firstName }}</p>\n                        <input *ngIf=\"mode=='edit'\" class=\"form-control\" id=\"firstName\" placeholder=\"Enter first name\"\n                            type=\"text\" [(ngModel)]=\"user.firstName\"\n                            [ngClass]=\"{ 'is-invalid': !vh.isValid(profileForm, 'firstName') }\" required formControlName=\"firstName\">\n                            <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(profileForm, 'firstName')\">\n                              {{ vh.getMsg(profileForm,'firstName') }}\n                            </div>\n                        <hr>\n                        <small class=\"text-muted\">{{ this.translate.data[\"LastName\"] }}: </small>\n                        <p *ngIf=\"mode!='edit'\">{{ user.lastName }}</p>\n                        <input *ngIf=\"mode=='edit'\" class=\"form-control\" id=\"lastName\" placeholder=\"Enter last name\"\n                            type=\"text\" [(ngModel)]=\"user.lastName\"\n                            [ngClass]=\"{ 'is-invalid': !vh.isValid(profileForm, 'lastName') }\" required formControlName=\"lastName\">\n                            <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(profileForm, 'lastName')\">\n                                {{ vh.getMsg(profileForm,'lastName') }}\n                            </div>\n                        <hr>\n                        <small class=\"text-muted\">{{ this.translate.data[\"Email\"] }}: </small>\n                        <p>{{ user.email }}</p>\n                        <hr>\n                        <small class=\"text-muted\">{{ this.translate.data[\"Role\"] }}: </small>\n                        <p class=\"m-b-0\">{{ user.role }}</p>\n                        <hr>\n                        <small class=\"text-muted\">Id: </small>\n                        <p class=\"m-b-0\">{{user.id }}</p>\n                    </div>\n                    <div class=\"card-footer\">\n                        <button *ngIf=\"mode!='edit'\" class=\"btn btn-sm btn-primary\" type=\"button\" (click)=\"mode='edit'\">\n                            <i class=\"fa fa-edit\"></i> {{ this.translate.data[\"Edit\"] }}\n                        </button>\n                        <button *ngIf=\"mode=='edit'\" class=\"btn btn-sm btn-primary\" type=\"submit\"\n                            [disabled]=\"!profileForm.valid\">\n                            <i class=\"fa fa-dot-circle-o\"></i> {{ this.translate.data[\"Submit\"] }}\n                        </button>\n                        <button *ngIf=\"mode=='edit'\" class=\"btn btn-sm btn-danger ml-3\" type=\"reset\"\n                            (click)=\"resetDetails()\">\n                            <i class=\"fa fa-ban\"></i> {{ this.translate.data[\"Cancel\"] }}\n                        </button>\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"col-xl-6 col-lg-5 col-md-12\">\n            <div *ngFor=\"let group of notifications\">\n                <div class=\"list-group-item list-group-item-accent-secondary bg-light \n                text-center font-weight-bold text-muted text-uppercase small\">{{group.title}}</div>\n                <div *ngFor=\"let noti of group.data\" class=\"list-group-item list-group-item-accent-{{ noti.urgency}}\">\n                    <div class=\"avatar float-right\"></div>\n                    <div>{{ noti.subject }} <strong>{{ noti.message }}</strong></div>\n                    <small class=\"text-muted mr-3\">\n                        <i class=\"icon-calendar\"></i>&nbsp; {{ noti.day }}\n                    </small>\n                    <small class=\"text-muted\">\n                        <i class=\"icon-info\">\n                        </i>&nbsp; {{ noti.device }}\n                    </small>\n                </div>\n            </div>\n            <div *ngIf=\"notifications.length == 0\">\n                <div class=\"list-group-item text-center font-weight-bold text-muted text-uppercase small\">\n                    {{ this.translate.data[\"NoSUCHNotifications\"] }}</div>\n            </div>\n\n        </div>\n    </div>\n\n</div>\n\n\n<!-- update Avatar modal -->\n<div bsModal #updateAvatarModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-info\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-body\">\n                <app-avatar-update></app-avatar-update>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"updateAvatarModal.hide()\">{{ this.translate.data[\"Cancel\"] }}</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";

/***/ }),

/***/ 33765:
/*!************************************************************************!*\
  !*** ./src/app/components/rd-table/rd-table.component.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"\">\n  <div class=\"card-body\">\n    <!-- action bar -->\n    <div class=\"col-12\">\n      <button *ngIf=\"opt_obj.create\" (click)=\"openModal(content, 'Create')\" id=\"add-row-button\"\n        class=\"btn  btn-primary px-4 mb-3 mr-1\">Add</button>\n      <button *ngIf=\"opt_obj.update\" (click)=\"openModal(content, 'Update')\" [disabled]=\"selectedRecords.size != 1\"\n        id=\"add-row-button\" class=\"btn btn-primary px-4 mb-3 mr-1\">Edit</button>\n      <button *ngIf=\"opt_obj.delete\" (click)=\"openModal(content, 'Delete')\" id=\"add-row-button\"\n      [disabled]=\"selectedRecords.size != 1\" class=\"btn btn-warning px-4 mb-3 mr-5\">Delete</button>\n      <!--[disabled]=\"selectedRecords.size == 0\" class=\"btn btn-warning px-4 mb-3 mr-5\">Delete</button>-->\n      <button *ngIf=\"opt_obj.csv\" (click)=\"exportToCSV()\" id=\"add-row-button\"\n        class=\"btn  btn-primary px-4 mb-3 mr-1\">Export to CSV</button>\n      <button *ngIf=\"opt_obj.pdf\" (click)=\"exportToPDF()\" id=\"add-row-button\"\n        class=\"btn  btn-primary px-4 mb-3 mr-3\">Export to PDF</button>\n    </div>\n    <!-- end of action bar -->\n    <div class=\"col-12\">\n      <div class=\"\">\n        <!-- Table element-->\n        <ngx-table #table [configuration]=\"configuration\" [data]=\"data\" [columns]=\"filteredSchema\"\n          (event)=\"triggerAChangeEvent($event)\">\n        </ngx-table>\n        <!-- End of table element -->\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Form Modal for Create/Update/Delete -->\n<ng-template #content let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">{{content.title}}</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <!-- form area -->\n    <form *ngIf=\"content.operation === 'Create' || content.operation === 'Update'\" [formGroup]=\"form\">\n      <div class=\"form-group\" *ngFor=\"let attr of schema\">\n        <div\n          *ngIf=\"(attr.create!=false && content.operation == 'Create') || (attr.update!=false && content.operation =='Update')\">\n          <label for=\"{{attr.key}}\">{{attr.title}}</label>\n          <div class=\"input-group\">\n            <!-- drop down control for option as array of obj [{value: '', label: ''}] -->\n            <select *ngIf=\"attr.options !== undefined && attr.optionObj !== undefined\" id=\"{{attr.key}}\"\n              name=\"{{attr.key}}\" [multiple]=\"attr.type==='multiple'\" [formControlName]=\"attr.key\"\n              [className]=\"!isValid(attr.key)?'form-control is-invalid':'form-control'\">\n              <option *ngFor=\"let option of attr.options\" [selected]=\"content.record[attr.key] === option.label\"\n                value=\"{{option.value}}\"> {{option.label}} </option>\n            </select>\n            <!-- drop down control for option as array of str ['',''] -->\n            <select *ngIf=\"attr.options !== undefined && attr.optionObj === undefined\" id=\"{{attr.key}}\"\n              name=\"{{attr.key}}\" [multiple]=\"attr.type==='multiple'\" [formControlName]=\"attr.key\"\n              [className]=\"!isValid(attr.key)?'form-control is-invalid':'form-control'\">\n              <option *ngFor=\"let option of attr.options\" [selected]=\"content.record[attr.key] === option\"\n                value=\"{{option}}\"> {{option}} </option>\n            </select>\n            <!-- checkbox control-->\n            <div *ngIf=\"attr.type === 'checkbox'\" class=\"custom-control custom-checkbox px-gdn-checkbox-1\">\n              <input type=\"checkbox\" [checked]=\"content.record[attr.key]\" id=\"{{attr.key}}\" name=\"{{attr.key}}\"\n                value=\"{{content.record[attr.key]}}\" [formControlName]=\"attr.key\"\n                [className]=\"!isValid(attr.key)?'form-control is-invalid ml-3':'form-control ml-3'\" />\n              <label class=\"custom-control-label ml-3\" for=\"{{attr.key}}\"></label>\n            </div>\n            <!-- you can add more controls after this line and include the oposite conditon in the text contorl part -->\n            <!-- text control -->\n            <input *ngIf=\"attr.options === undefined && attr.type !== 'checkbox'\" id=\"{{attr.key}}\" name=\"{{attr.key}}\"\n              type=\"{{attr.type}}\" [formControlName]=\"attr.key\" placeholder=\"{{attr.description||attr.title}}\"\n              value=\"{{content.record[attr.key]}}\"\n              [className]=\"!isValid(attr.key)?'form-control is-invalid':'form-control'\" />\n            <!-- validation feedback text -->\n            <div class=\"form-text invalid-feedback\" *ngIf=\"!isValid(attr.key)\">\n              <small> {{getValidationMsg(attr.key)}} </small>\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n    <!-- end form area -->\n    <form *ngIf=\"content.operation === 'Delete'\">\n      <h4>Are you sure to delete? (Total: {{content.records.length}})</h4>\n      <ul *ngFor=\"let record of content.records\">\n        <li>{{opt_obj.pKey_label}}: {{record[opt_obj.pKey]}}</li>\n      </ul>\n    </form>\n\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-info\" (click)=\"modal.close()\">{{content.closeLabel}}</button>\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"save(content.operation, content.rowIndex)\"\n      [disabled]=\"!form.valid\">{{content.saveLabel}}</button>\n  </div>\n</ng-template>\n<!-- end of Form Modal-->\n\n<ng-template #imageTpl let-row let-rowIndex=\"rowIndex\">\n  <div>\n    <img [src]=\"row['avatarUrls']['32x32']\" [alt]=\"row[opt_obj['pKey']]\" style=\"width: 32px\">\n  </div>\n</ng-template>\n\n<!-- Alert Modal -->\n<ng-template #alertModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">\n      <i _ngcontent-c18=\"\" class=\"material-icons m-1 ng-star-inserted\">report_problem</i>\n      {{alertContent.title}}\n    </h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <p>{{alertContent.message}}</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-info\" (click)=\"modal.close()\">Close</button>\n  </div>\n</ng-template>\n<!-- end of Alert Modal-->\n\n<!-- To do: inline edit/delete -->";

/***/ }),

/***/ 59645:
/*!************************************************************************!*\
  !*** ./src/app/components/settings/settings.component.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<p>settings works!</p>\n";

/***/ }),

/***/ 88649:
/*!****************************************************************!*\
  !*** ./src/app/components/user/user.component.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"row\">\n    <div class=\"col-xl-12 col-lg-12 col-md-12\">\n        <div class=\"card\">\n            <div class=\"card-header\"><strong>Manage Users</strong></div>\n            <div class=\"card-body\">\n                <app-rd-table #table [options]=\"options\" [fields]=\"fields\">\n                </app-rd-table>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ }),

/***/ 8752:
/*!************************************************************************************!*\
  !*** ./src/app/containers/default-layout/default-layout.component.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<app-header [navbarBrandRouterLink]=\"['/']\" [fixed]=\"true\"\n  [navbarBrandFull]=\"{src: 'assets/img/brand/logo.png', width: 89, alt: 'Mansoob Logo'}\"\n  [navbarBrandMinimized]=\"{src: 'assets/img/brand/logo_small.png', width: 30, height: 30, alt: 'Mansoob Logo'}\"\n  [sidebarToggler]=\"isAdmin?'lg':false\" [asideMenuToggler]=\"'lg'\">\n  <ul class=\"nav navbar-nav d-md-down-none\">\n    <li class=\"nav-item px-3\">\n      <a class=\"nav-link\" [routerLink]=\"['/dashboard']\">{{ this.translate.data[\"Dashboard\"] }}</a>\n    </li>\n    <li class=\"nav-item px-3\">\n      <a class=\"nav-link\" [routerLink]=\"['/device']\">{{ this.translate.data[\"Devices\"] }}</a>\n    </li>\n    <li class=\"nav-item px-3\">\n      <a class=\"nav-link\" [routerLink]=\"['/notification']\">{{ this.translate.data[\"Settings\"] }}</a>\n    </li>\n    <li class=\"nav-item px-3\">\n      <div class=\"custom-control custom-switch\">\n        <input type=\"checkbox\" class=\"custom-control-input\" id=\"darkSwitch\" [(ngModel)]=\"themeSwitcherIsChecked\"\n          (change)=\"switchTheme()\" data-checked=\"Dark\" data-unchecked=\"Light\">\n        <label class=\"custom-control-label\" for=\"darkSwitch\">{{ this.translate.data[\"DARKMODE\"] }}</label>\n      </div>\n    </li>\n  </ul>\n\n  <ul class=\"nav navbar-nav header-ml-auto-custom\">\n    <li class=\"nav-item d-md-down-none mr-2\">{{user.firstName}}</li>\n    <li class=\"nav-item dropdown\" dropdown placement=\"bottom right\">\n      <a class=\"nav-link\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"\n        dropdownToggle (click)=\"false\">\n        <ngx-avatar size=\"35\" src=\"http://yousefcave.com/uploads/avatars/{{user.id}}-avatar.png\" name=\"{{user.name}}\">\n        </ngx-avatar>\n      </a>\n      <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\n        <div class=\"dropdown-header text-center\"><strong> {{ this.translate.data[\"YOUARE\"] }} {{user.role}}</strong>\n        </div>\n        <a class=\"dropdown-item\" href=\"#\" [routerLink]=\"['/profile']\"><i class=\"fa fa-user\"></i>\n          {{ this.translate.data[\"PROFILE\"] }}</a>\n        <a class=\"dropdown-item\" href=\"#\" (click)=\"logout()\"><i class=\"fa fa-lock\"></i>\n          {{ this.translate.data[\"LOGOUT\"] }}</a>\n      </div>\n    </li>\n    <li class=\"nav-item px-3  d-md-down-none\">\n      <div class=\"ml-auto\">\n        <button class=\"btn btn-secondary btn-sm\" type=\"button\" id=\"rtlSwitch\"\n          (click)=\"switchRTL('S')\">{{rtlSwitcherIsChecked}}</button>\n      </div>\n    </li>\n  </ul>\n</app-header>\n<div class=\"app-body\">\n  <app-sidebar #appSidebar [fixed]=\"true\" [display]=\"false\" [minimized]=\"sidebarMinimized\"\n    (minimizedChange)=\"toggleMinimize($event)\" [class.d-lg-none]=\"isAdmin === false\">\n    <app-sidebar-nav [navItems]=\"navItems\" [perfectScrollbar] [disabled]=\"appSidebar.minimized\"></app-sidebar-nav>\n    <app-sidebar-minimizer></app-sidebar-minimizer>\n  </app-sidebar>\n  <!-- Main content -->\n  <main class=\"main\">\n    <!-- Breadcrumb -->\n    <!-- breaking change 'cui-breadcrumb' -->\n    <cui-breadcrumb>\n      <!-- Breadcrumb Menu -->\n      <li class=\"breadcrumb-menu d-md-down-none\">\n        <div class=\"btn-group\" role=\"group\" aria-label=\"Button group with nested dropdown\">\n          <div class=\"ml-5 text-primary\">{{ timeNow }}</div>\n        </div>\n      </li>\n    </cui-breadcrumb>\n\n    <div class=\"container-fluid\">\n      <router-outlet></router-outlet>\n    </div><!-- /.container-fluid -->\n  </main>\n\n  <app-aside [fixed]=\"false\" [display]=\"false\" [ngClass]=\"'test'\">\n    <tabset>\n      <tab>\n        <ng-template tabHeading><i class=\"icon-list\"></i></ng-template>\n        <div *ngFor=\"let group of notifications\">\n          <div class=\"list-group-item list-group-item-accent-secondary bg-light \n      text-center font-weight-bold text-muted text-uppercase small\">{{group.title}}</div>\n          <div *ngFor=\"let noti of group.data\" class=\"list-group-item list-group-item-accent-{{ noti.urgency}}\">\n            <div class=\"avatar float-right\"></div>\n            <div>{{ noti.subject }} <strong>{{ noti.message }}</strong></div>\n            <small class=\"text-muted mr-3\">\n              <i class=\"icon-calendar\"></i>&nbsp; {{ noti.day }}\n            </small>\n            <small class=\"text-muted\">\n              <i class=\"icon-info\">\n              </i>&nbsp; {{ noti.device }}\n            </small>\n          </div>\n        </div>\n        <div *ngIf=\"notifications.length == 0\">\n          <div class=\"list-group-item text-center font-weight-bold text-muted text-uppercase small\">No SUCH\n            Notifications\n          </div>\n        </div>\n      </tab>\n      <tab>\n        <ng-template tabHeading><i class=\"icon-settings\"></i></ng-template>\n        <div class=\"p-3\">\n          <h6>{{ this.translate.data[\"Settings\"] }}</h6>\n          <div class=\"aside-options\">\n            <div class=\"clearfix mt-4\">\n              <div class=\"custom-control custom-switch\">\n                <input type=\"checkbox\" class=\"custom-control-input\" id=\"darkSwitch\" [(ngModel)]=\"themeSwitcherIsChecked\"\n                  (change)=\"switchTheme()\" data-checked=\"Dark\" data-unchecked=\"Light\">\n                <label class=\"custom-control-label\" for=\"darkSwitch\">{{ this.translate.data[\"DARKMODE\"] }}</label>\n              </div>\n            </div>\n          </div>\n          <div class=\"aside-options\">\n            <div class=\"clearfix mt-4\">\n              <hr/>\n              <label class=\"switch switch-label switch-pill switch-success switch-sm float-right\">\n                <button class=\"btn btn-secondary btn-sm\" type=\"button\" id=\"rtlSwitch\"\n                (click)=\"switchRTL('S')\">{{rtlSwitcherIsChecked}}</button>\n              </label>\n            </div>\n          </div>\n        </div>\n      </tab>\n    </tabset>\n  </app-aside>\n\n</div>\n<app-footer>\n  <span><a href=\"\">Mansoob v2.0</a> &copy; </span>\n  <span class=\"ml-auto\">Developed by <a href=\"http://yousefcave.com\">Yousef AlSuwaidan</a></span>\n</app-footer>";

/***/ }),

/***/ 57162:
/*!***********************************************************!*\
  !*** ./src/app/views/error/404.component.html?ngResource ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"app flex-row align-items-center\"   style=\"background-color: #2f353a;\" >\n  <div class=\"container\">\n    <div class=\"row justify-content-center\" >\n      <code class=\"col-md-12\">\n        <h2>{{ this.translate.data[\"Awww404\"] }}</h2>\n        <div><strong style=\"font-size: 5rem;\" class=\"display-2\">{{ this.translate.data[\"404Error\"] }}</strong>\n          <br>\n          {{ this.translate.data[\"404Msg\"] }}\n        </div>\n      </code>\n    </div>\n      <div class=\"row justify-content-center\">\n      <div class=\"col-sm-4 col-md-2 pt-4 mt-4\">\n        <button class=\"btn btn-block btn-outline-light\" type=\"button\" [routerLink]=\"['/']\">\n          {{ this.translate.data[\"Home\"] }}\n        </button>\n      </div>\n    </div>\n  </div>\n</div>";

/***/ }),

/***/ 71682:
/*!***********************************************************!*\
  !*** ./src/app/views/error/500.component.html?ngResource ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"app flex-row align-items-center\"   style=\"background-color: white;\" >\n  <div class=\"container\">\n    <div class=\"row justify-content-center\" >\n      <div class=\"col-md-4\">\n        <img class=\"thumb-image loaded\"\n        data-image-dimensions=\"1500x2025\" data-image-focal-point=\"0.5,0.5\" alt=\"\" data-load=\"false\"\n        style=\"height: 130%; position: absolute;\" \n        src=\"https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1470175715831-NUJOMI6VW13ZNT1MI0VB/ke17ZwdGBToddI8pDm48kEj8h6tFfEHTeCG-xJISxCF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQNtHfWuxJOqPNnonx2vPn19YmYaYuKXkbKFz0xx0uTakvjJh3JJWsjdMZ66YIxKAg/image-asset.jpeg?format=750w\">\n      </div>\n\n\n      <code class=\"col-md-7\">\n        <h2>Sorry... Something went wrong </h2>\n        <div><strong style=\"font-size: 5rem;\" class=\"display-2\">505 Error!</strong>\n          <br>The page you are looking for is temporarily unavailable.\n        </div>\n      </code>\n    </div>\n      <div class=\"row justify-content-center\">\n      <div class=\"col-sm-4 col-md-2 pt-4 mt-4\">\n        <button class=\"btn btn-block btn-outline-dark\" type=\"button\" [routerLink]=\"['/']\">\n          Home\n        </button>\n      </div>\n    </div>\n  </div>\n</div>";

/***/ }),

/***/ 50514:
/*!*************************************************************!*\
  !*** ./src/app/views/login/login.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"app-body\">\n  <main class=\"main d-flex align-items-center\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-8 mx-auto  my-5\">\n          <div class=\"card-group\">\n            <div class=\"card p-4 custom-login-card\">\n              <div class=\"card-body\">\n                <div *ngIf=\"alreadyLoggedIn\">\n                  <h2>{{ this.translate.data[\"AlreadyloggedIn\"] }}</h2>\n                  <p class=\"text-muted\">{{ this.translate.data[\"AlreadyloggedInMsg\"] }}</p>\n                  <div class=\"row\">\n                    <div class=\"col-6 \">\n                      <button type=\"button\" class=\"btn btn-primary px-4\" [routerLink]=\"['/']\">{{ this.translate.data[\"Home\"] }}</button>\n                    </div>\n                    <div class=\"col-6 text-right\">\n                      <button type=\"button\" class=\"btn btn-danger px-4\" (click)=\"logout()\">{{ this.translate.data[\"Logout\"] }}</button>\n                    </div>\n                  </div>\n                </div>\n                <form [formGroup]=\"loginForm\"  *ngIf=\"!alreadyLoggedIn\" (ngSubmit)=\"signInWithEmail(loginForm)\">\n                  <h1>{{ this.translate.data[\"Login\"] }}</h1>\n                  <p class=\"text-muted\">{{ this.translate.data[\"LoginMsg\"] }}</p>\n                  <div class=\"input-group mb-3\">\n                    <div class=\"input-group-prepend\">\n                      <span class=\"input-group-text\"><i class=\"icon-user\"></i></span>\n                    </div>\n                    <input type=\"email\" class=\"form-control\" id=\"loginEmailId\" aria-describedby=\"emailHelp\"\n                      placeholder=\"Enter email\" name=\"email\" [(ngModel)]=\"user.email\"\n                      [ngClass]=\"{ 'is-invalid': !vh.isValid(loginForm, 'email') }\" required formControlName=\"email\">\n                    <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(loginForm, 'email')\">\n                      {{ vh.getMsg(loginForm,'email') }}\n                    </div>\n                  </div>\n                  <div class=\"input-group mb-4\">\n                    <div class=\"input-group-prepend\">\n                      <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                    </div>\n                    <input type=\"password\" class=\"form-control\" id=\"loginPassword\" name=\"password\"\n                      [(ngModel)]=\"user.password\" autocomplete=\"current-password\" placeholder=\"Password\" required\n                      [ngClass]=\"{ 'is-invalid': !vh.isValid(loginForm, 'password') }\" required formControlName=\"password\">\n                      <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(loginForm, 'password')\">\n                        {{ vh.getMsg(loginForm, 'password') }}\n                      </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"col-6\">\n                      <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!loginForm.valid\">\n                        {{ this.translate.data[\"Login\"] }}\n                      </button>\n                    </div>\n                    <div class=\"col-6 text-right\">\n                      <button type=\"button\" class=\"btn btn-link px-0\" [routerLink]=\"['/reset']\"\n                        [queryParams]=\"{mode: 'request'}\">{{ this.translate.data[\"Forgotpassword?\"] }}</button>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n            <div class=\"card text-white bg-primary py-5 custom-singup-card\">\n              <div class=\"card-body text-center\">\n                <div>\n                  <h2>{{ this.translate.data[\"Signup\"] }}</h2>\n                  <p>{{ this.translate.data[\"SignupMsg\"] }}\n                  </p>\n                  <button type=\"button\" class=\"btn btn-primary active mt-3\" [routerLink]=\"['/register']\">\n                    {{ this.translate.data[\"RegisterNow!\"] }}\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>";

/***/ }),

/***/ 13956:
/*!*******************************************************************!*\
  !*** ./src/app/views/register/register.component.html?ngResource ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"app-body\">\n  <main class=\"main d-flex align-items-center\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-6 mx-auto my-5\">\n          <div class=\"card mx-4\">\n            <div class=\"card-body p-4\">\n              <form [formGroup]=\"registerForm\" (ngSubmit)=\"signup(registerForm)\">\n                <h1>{{ this.translate.data[\"Register\"] }}</h1>\n                <p class=\"text-muted\">{{ this.translate.data[\"Createyouraccount\"] }}</p>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-user\"></i></span>\n                  </div>\n                  <input type=\"text\" class=\"form-control\" name=\"firstName\" [(ngModel)]=\"user.firstName\"  placeholder=\"First Name\" autocomplete=\"first name\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(registerForm, 'firstName') }\" required formControlName=\"firstName\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(registerForm, 'firstName')\">\n                    {{ vh.getMsg(registerForm,'firstName') }}\n                  </div>\n                </div>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-user\"></i></span>\n                  </div>\n                  <input type=\"text\" class=\"form-control\" name=\"lastName\" [(ngModel)]=\"user.lastName\"  placeholder=\"Last Name\" autocomplete=\"last name\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(registerForm, 'lastName') }\" required formControlName=\"lastName\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(registerForm, 'lastName')\">\n                    {{ vh.getMsg(registerForm,'lastName') }}\n                  </div>\n                </div>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">@</span>\n                  </div>\n                  <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\"  placeholder=\"Email\" autocomplete=\"email\"  mdbInputValidate\n                  [email]=\"true\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(registerForm, 'email') }\" required formControlName=\"email\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(registerForm, 'email')\">\n                    {{ vh.getMsg(registerForm,'email') }}\n                  </div>\n                </div>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                  </div>\n                  <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\"  placeholder=\"Password\" autocomplete=\"new-password\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(registerForm, 'password') }\" required formControlName=\"password\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(registerForm, 'password')\">\n                    {{ vh.getMsg(registerForm,'password') }}\n                  </div>\n                </div>\n                <div class=\"input-group mb-4\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                  </div>\n                  <input type=\"password\" class=\"form-control\" name=\"rpassword\" [(ngModel)]=\"user.rpassword\"  placeholder=\"Repeat password\" autocomplete=\"new-password\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(registerForm, 'rpassword') }\" required formControlName=\"rpassword\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(registerForm, 'rpassword')\">\n                    {{ vh.getMsg(registerForm,'rpassword') }}\n                  </div>\n                </div>\n                <button type=\"submit\" class=\"btn btn-block btn-success\" [disabled]=\"!registerForm.valid\">\n                  {{ this.translate.data[\"CreateAccount\"] }}</button>\n              </form>\n            </div>\n            <div class=\"card-footer p-4\">\n              <alert type=\"{{feedbackType}}\" *ngIf=\"feedbackInUserCreate\">\n                <div role=\"alert\" class=\"alert alert-{{feedbackType}}\">\n                  {{feedbackMessage}} </div>\n                </alert>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n";

/***/ }),

/***/ 52253:
/*!*************************************************************!*\
  !*** ./src/app/views/reset/reset.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"app-body\">\n  <main class=\"main d-flex align-items-center\">\n    <div class=\"container\">\n\n    <!-- Step 1: Request form  -->\n      <div class=\"row\" *ngIf=\"mode=='request'\">\n        <div class=\"col-md-6 mx-auto my-5\">\n          <div class=\"card mx-4\">\n            <div class=\"card-body p-4\">\n              <form [formGroup]=\"requestForm\"  (ngSubmit)=\"request(requestForm)\">\n                <h1>Reset</h1>\n                <p class=\"text-muted\">Enter your email</p>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">@</span>\n                  </div>\n                  <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\"  placeholder=\"Email\" autocomplete=\"email\"  mdbInputValidate\n                  [email]=\"true\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(requestForm, 'email') }\" required formControlName=\"email\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(requestForm, 'email')\">\n                    {{ vh.getMsg(requestForm,'email') }}\n                  </div>\n                </div>\n                <button type=\"submit\" class=\"btn btn-block btn-success\" [disabled]=\"!requestForm.valid\">Reset</button>\n              </form>\n            </div>\n            <div class=\"card-footer p-4\">\n              <alert type=\"{{feedbackType}}\" *ngIf=\"feedbackInReset\">\n                <div role=\"alert\" class=\"alert alert-{{feedbackType}}\">\n                  {{feedbackMessage}} </div>\n                </alert>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Step 2: Reset form  -->\n      <div class=\"row\" *ngIf=\"mode=='reset' && token.length>0\">\n        <div class=\"col-md-6 mx-auto my-5\">\n          <div class=\"card mx-4\">\n            <div class=\"card-body p-4\">\n              <form [formGroup]=\"resetForm\" (ngSubmit)=\"reset(resetForm)\">\n                <h1>Reset</h1>\n                <p class=\"text-muted\">Reset your password</p>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">@</span>\n                  </div>\n                  <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\"  placeholder=\"Email\" autocomplete=\"email\"  mdbInputValidate\n                  [email]=\"true\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(resetForm, 'email') }\" required formControlName=\"email\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(resetForm, 'email')\">\n                    {{ vh.getMsg(resetForm,'email') }}\n                  </div>\n                </div>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                  </div>\n                  <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\"  placeholder=\"Password\" autocomplete=\"new-password\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(resetForm, 'password') }\" required formControlName=\"password\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(resetForm, 'password')\">\n                    {{ vh.getMsg(resetForm,'password') }}\n                  </div>\n                </div>\n                <div class=\"input-group mb-4\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                  </div>\n                  <input type=\"password\" class=\"form-control\" name=\"rpassword\" [(ngModel)]=\"user.rpassword\"  placeholder=\"Repeat password\" autocomplete=\"new-password\" required\n                  [ngClass]=\"{ 'is-invalid': !vh.isValid(resetForm, 'rpassword') }\" required formControlName=\"rpassword\">\n                  <div class=\"form-text invalid-feedback\" *ngIf=\"!vh.isValid(resetForm, 'rpassword')\">\n                    {{ vh.getMsg(resetForm,'rpassword') }}\n                  </div>\n                </div>\n                <button type=\"submit\" class=\"btn btn-block btn-success\"  [disabled]=\"!resetForm.valid\">Reset</button>\n              </form>\n            </div>\n            <div class=\"card-footer p-4\">\n              <alert type=\"{{feedbackType}}\" *ngIf=\"feedbackInReset\">\n                <div role=\"alert\" class=\"alert alert-{{feedbackType}}\">\n                  {{feedbackMessage}} </div>\n                </alert>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map