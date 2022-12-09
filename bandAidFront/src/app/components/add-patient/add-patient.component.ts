import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
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
    room_number: 0
  };
  submitted = false;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  savePatient(): void {
    const data = {
      name: this.patient.name,
      age: this.patient.age,
      gender: this.patient.gender,
      race: this.patient.race,
      condition_name: this.patient.condition_name,
      room_number: this.patient.room_number
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
      room_number: 0
    };
  }

}
