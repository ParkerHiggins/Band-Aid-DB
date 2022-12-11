import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  @Input() inParent = false;
  @Output() selectDoctor: EventEmitter<Doctor> = new EventEmitter();

  doctors?: Doctor[];
  currentDoctor: Doctor = {};
  currentIndex = -1;
  name = '';

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.retrieveDoctors();
  }

  retrieveDoctors(): void {
    this.doctorService.getAll()
      .subscribe({
        next: (data) => {
          this.doctors = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveDoctors();
    this.currentDoctor = {};
    this.currentIndex = -1;
  }

  setActiveDoctor(doctor: Doctor, index: number): void {
    this.currentDoctor = doctor;
    this.currentIndex = index;
  }

  setActiveDoctorChild(doctor: Doctor, index: number): void {
    this.currentDoctor = doctor;
    this.currentIndex = index;
    this.selectDoctor.emit(this.currentDoctor);
  }

  removeAllDoctors(): void {
    this.doctorService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentDoctor = {};
    this.currentIndex = -1;

    this.doctorService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.doctors = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
