import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';

import { AddPatientComponent } from "./components/add-patient/add-patient.component";
import { PatientDetailsComponent } from "./components/patient-details/patient-details.component";
import { PatientListComponent } from "./components/patient-list/patient-list.component";

import { TreatmentListComponent } from './components/treatment-list/treatment-list.component';
import { TreatmentDetailsComponent } from './components/treatment-details/treatment-details.component';
import { AddTreatmentComponent } from './components/add-treatment/add-treatment.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddConditionComponent } from './components/add-condition/add-condition.component';
import { AddProviderComponent } from './components/add-provider/add-provider.component';
import { ConditionDetailsComponent } from './components/condition-details/condition-details.component';
import { ProviderDetailsComponent } from './components/provider-details/provider-details.component';
import { ConditionListComponent } from './components/condition-list/condition-list.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';

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
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    TreatmentListComponent,
    TreatmentDetailsComponent,
    AddTreatmentComponent,
    AddConditionComponent,
    AddProviderComponent,
    ConditionDetailsComponent,
    ProviderDetailsComponent,
    ConditionListComponent,
    ProviderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
