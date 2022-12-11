import { Component, Input, OnInit } from '@angular/core';
import { TreatmentService } from 'src/app/services/treatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-treatment-details',
  templateUrl: './treatment-details.component.html',
  styleUrls: ['./treatment-details.component.css']
})
export class TreatmentDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTreatment: Treatment = {
    name: '',
    duration: '',
    cost: 0
  };

  message = '';

  constructor(
    private treatmentService: TreatmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      console.log(this.currentTreatment.name);
      this.message = '';
      this.getTreatment(this.route.snapshot.params["id"]);
    }
  }

  getTreatment(id: string): void {
    console.log("getTreatment w/ id:");
    console.log(id);
    this.treatmentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTreatment = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // todo: might need to get rid of this sone
  // updatePublished(status: boolean): void {
  //   const data = {
  //     name: this.currentTreatment.name,
  //     description: this.currentTreatment.description,
  //     published: status
  //   };
  //
  //   this.message = '';
  //
  //   this.treatmentService.update(this.currentTreatment.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentTreatment.published = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  updateTreatment(): void {
    this.message = '';

    this.treatmentService.update(this.currentTreatment.id, this.currentTreatment)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This treatment was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTreatment(): void {
    this.treatmentService.delete(this.currentTreatment.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/treatments']);
        },
        error: (e) => console.error(e)
      });
  }

}
