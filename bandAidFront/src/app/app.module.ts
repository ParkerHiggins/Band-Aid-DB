import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';

import { AddPatientComponent} from "./components/add-patient/add-patient.component";
import { PatientDetailsComponent} from "./components/patient-details/patient-details.component";
import { PatientListComponent } from "./components/patient-list/patient-list.component";

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReportsComponent } from "./components/reports/reports.component";
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddDoctorComponent,
    DoctorDetailsComponent,
    DoctorListComponent,
    AddPatientComponent,
    PatientDetailsComponent,
    PatientListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ReportsComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
