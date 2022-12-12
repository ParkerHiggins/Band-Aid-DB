import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';

import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDetailsComponent} from "./components/patient-details/patient-details.component";
import { AddPatientComponent} from "./components/add-patient/add-patient.component";

import { TreatmentListComponent } from './components/treatment-list/treatment-list.component';
import { TreatmentDetailsComponent } from './components/treatment-details/treatment-details.component';
import { AddTreatmentComponent } from './components/add-treatment/add-treatment.component';

import {ConditionListComponent} from "./components/condition-list/condition-list.component";
import {ConditionDetailsComponent} from "./components/condition-details/condition-details.component";
import {AddConditionComponent} from "./components/add-condition/add-condition.component";

import {ProviderListComponent} from "./components/provider-list/provider-list.component";
import {ProviderDetailsComponent} from "./components/provider-details/provider-details.component";
import {AddProviderComponent} from "./components/add-provider/add-provider.component";

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';

const routes: Routes = [

  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/:id', component: DoctorDetailsComponent },
  { path: 'add', component: AddDoctorComponent },

  { path: 'patients', component: PatientListComponent},
  { path: 'patients/:id', component: PatientDetailsComponent},
  { path: 'add2', component: AddPatientComponent},

  { path: 'treatments', component: TreatmentListComponent },
  { path: 'treatments/:id', component: TreatmentDetailsComponent },
  { path: 'addTreatment', component: AddTreatmentComponent },

  { path: 'conditions', component: ConditionListComponent },
  { path: 'conditions/:id', component: ConditionDetailsComponent },
  { path: 'addCondition', component: AddConditionComponent },

  { path: 'providers', component: ProviderListComponent },
  { path: 'providers/:id', component: ProviderDetailsComponent },
  { path: 'addProvider', component: AddProviderComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
