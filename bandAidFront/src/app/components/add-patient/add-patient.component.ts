import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Condition } from 'src/app/models/condition.model';
import { Provider } from 'src/app/models/provider.model';
import { Doctor } from 'src/app/models/doctor.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patient: Patient = {
    name: '',
    age: 0,
    gender: '',
    race: '',
    condition_name: '',
    room_number: 0,
    provider_name: '',
    doctor_name: ''
  };
  submitted = false;

  condition: Condition = {};
  provider: Provider = {};
  doctor: Doctor = {};

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  updateCondition(condition: Condition): void {
    this.condition = condition;
  }

  updateProvider(provider: Provider): void {
    this.provider = provider;
  }

  updateDoctor(doctor: Doctor): void {
    this.doctor = doctor;
  }

  savePatient(): void {
    const data = {
      name: this.patient.name,
      age: this.patient.age,
      gender: this.patient.gender,
      race: this.patient.race,
      condition_name: this.condition.condition_name,
      room_number: this.patient.room_number,
      conditionId: this.condition.id,
      provider_name: this.provider.name,
      providerId: this.provider.id,
      doctor_name: this.doctor.name,
      doctorId: this.doctor.id
    };

    this.patientService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPatient(): void {
    this.submitted = false;
    this.patient = {
      name: '',
      age: 0,
      gender: '',
      race: '',
      condition_name: '',
      room_number: 0,
      provider_name: '',
      doctor_name: ''
    };
  }

}
