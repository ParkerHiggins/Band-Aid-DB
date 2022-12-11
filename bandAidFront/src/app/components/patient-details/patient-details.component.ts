import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import {Condition} from "../../models/condition.model";
import {Provider} from "../../models/provider.model";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentPatient: Patient = {
    name: '',
    age: 0,
    gender: '',
    race: '',
    condition_name: '',
    room_number: 0,
    provider_name: '',
    doctor_name: ''
  };

  message = '';

  condition: Condition = {};
  provider: Provider = {};
  doctor: Doctor = {};

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPatient(this.route.snapshot.params["id"]);
    }
  }

  updateCondition(condition: Condition): void {
    this.condition = condition;
    this.currentPatient.condition_name = condition.condition_name;
  }

  updateProvider(provider: Provider): void {
    this.provider = provider;
  }

  updateDoctor(doctor: Doctor): void {
    this.doctor = doctor;
  }

  getPatient(id: string): void {
    this.patientService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPatient = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePatient(): void {
    this.message = '';

    const data = {
      name: this.currentPatient.name,
      age: this.currentPatient.age,
      gender: this.currentPatient.gender,
      race: this.currentPatient.race,
      condition_name: this.condition.condition_name,
      room_number: this.currentPatient.room_number,
      conditionId: this.condition.id,
      provider_name: this.provider.name,
      providerId: this.provider.id,
      doctor_name: this.doctor.name,
      doctorId: this.doctor.id
    };

    this.patientService.update(this.currentPatient.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This patient was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePatient(): void {
    this.patientService.delete(this.currentPatient.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/patients']);
        },
        error: (e) => console.error(e)
      });
  }

}
