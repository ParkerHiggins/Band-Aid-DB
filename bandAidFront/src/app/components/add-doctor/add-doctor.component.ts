import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  doctor: Doctor = {
    name: '',
    age: 0,
    specialty: ''
  };
  submitted = false;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
  }

  saveDoctor(): void {
    const data = {
      name: this.doctor.name,
      age: this.doctor.age,
      specialty: this.doctor.specialty
    };

    this.doctorService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newDoctor(): void {
    this.submitted = false;
    this.doctor = {
      name: '',
      age: 0,
      specialty: ''
    };
  }

}
