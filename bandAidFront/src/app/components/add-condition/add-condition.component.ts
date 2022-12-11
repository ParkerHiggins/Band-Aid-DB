import { Component, OnInit } from '@angular/core';
import { Condition } from 'src/app/models/condition.model';
import { Treatment } from 'src/app/models/treatment.model';
import { ConditionService } from 'src/app/services/condition.service';

@Component({
  selector: 'app-add-condition',
  templateUrl: './add-condition.component.html',
  styleUrls: ['./add-condition.component.css']
})
export class AddConditionComponent implements OnInit {

  condition: Condition = {
    condition_name: '',
    symptoms: '',
    treatment_name: ''
  };
  submitted = false;

  treatment: Treatment = {};

  constructor(private conditionService: ConditionService) { }

  ngOnInit(): void {
  }

  updateTreatment(treatment: Treatment): void {
    this.treatment = treatment;
    // treatment_name: this.treatment.name;
  }

  saveCondition(): void {
    const data = {
      condition_name: this.condition.condition_name,
      symptoms: this.condition.symptoms,
      treatment_name: this.treatment.name,
      treatmentId: this.treatment.id
    };

    this.conditionService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCondition(): void {
    this.submitted = false;
    this.condition = {
      condition_name: '',
      symptoms: '',
      treatment_name: ''
    };
  }

}
