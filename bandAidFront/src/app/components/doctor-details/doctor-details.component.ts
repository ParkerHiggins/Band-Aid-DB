import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentDoctor: Doctor = {
    name: '',
    age: 0,
    specialty: ''
  };

  message = '';

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDoctor(this.route.snapshot.params["id"]);
    }
  }

  getDoctor(id: string): void {
    console.log("getDoctor w/ id:");
    console.log(id);
    this.doctorService.get(id)
      .subscribe({
        next: (data) => {
          this.currentDoctor = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // todo: might need to get rid of this sone
  // updatePublished(status: boolean): void {
  //   const data = {
  //     name: this.currentDoctor.name,
  //     description: this.currentDoctor.description,
  //     published: status
  //   };
  //
  //   this.message = '';
  //
  //   this.doctorService.update(this.currentDoctor.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentDoctor.published = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  updateDoctor(): void {
    this.message = '';

    this.doctorService.update(this.currentDoctor.id, this.currentDoctor)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This doctor was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteDoctor(): void {
    this.doctorService.delete(this.currentDoctor.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/doctors']);
        },
        error: (e) => console.error(e)
      });
  }

}
