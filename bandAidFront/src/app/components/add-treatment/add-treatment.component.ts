import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment.model';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {

  treatment: Treatment = {
    name: '',
    duration: '',
    cost: 0
  };
  submitted = false;

  constructor(private treatmentService: TreatmentService) { }

  ngOnInit(): void {
  }

  saveTreatment(): void {
    const data = {
      name: this.treatment.name,
      duration: this.treatment.duration,
      cost: this.treatment.cost
    };

    this.treatmentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTreatment(): void {
    this.submitted = false;
    this.treatment = {
      name: '',
      duration: '',
      cost: 0
    };
  }

}
