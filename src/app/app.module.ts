import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { AuthService } from './services/auth.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule, AvatarSource } from 'ngx-avatar';

import { ShareModule } from '@ngx-share/core';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components4206
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import { NgbButtonsModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgwWowService } from 'ngx-wow';
import { FormGroup } from '@angular/forms';
import { RDTableComponent } from './components/rd-table/rd-table.component';

import { TableModule } from 'ngx-easy-table';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DeviceComponent } from './components/device/device.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { GaugeChartModule } from 'angular-gauge-chart';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AvatarUpdateComponent } from './components/profile/avatar-update/avatar-update.component'
import { ResetComponent } from './views/reset/reset.component';
import { HomeComponent } from './components/home/home.component';
import { ValidationHelper } from './_helper/validator_hp';


@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    CommonModule,
    ButtonsModule,
    ButtonsModule.forRoot(),
    TableModule,
    GaugeChartModule,
    ModalModule,
    ToastrModule.forRoot(),
    ShareModule,
    AvatarModule.forRoot({
      colors: ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"],
      sourcePriorityOrder: [AvatarSource.CUSTOM, AvatarSource.INITIALS]
    })
    ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    ResetComponent,
    RegisterComponent,
    DeviceComponent,
    RDTableComponent,
    UserComponent,
    DashboardComponent,
    SettingsComponent,
    ProfileComponent,
    AvatarUpdateComponent,
    HomeComponent
  ],
  providers: [
    AuthService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    NgwWowService,
    NgbButtonsModule,
    NgbModule,
    ValidationHelper
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
