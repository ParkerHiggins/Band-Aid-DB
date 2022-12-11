import { Component, Input, OnInit } from '@angular/core';
import { ConditionService } from 'src/app/services/condition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Condition } from 'src/app/models/condition.model';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-condition-details',
  templateUrl: './condition-details.component.html',
  styleUrls: ['./condition-details.component.css']
})
export class ConditionDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCondition: Condition = {
    condition_name: '',
    symptoms: '',
    treatment_name: ''
  };

  message = '';

  treatment: Treatment = {};

  constructor(
    private conditionService: ConditionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      console.log(this.currentCondition.condition_name);
      this.message = '';
      this.getCondition(this.route.snapshot.params["id"]);
    }
  }

  updateTreatment(treatment: Treatment): void {
    this.treatment = treatment;
  }

  getCondition(id: string): void {
    this.conditionService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCondition = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateCondition(): void {
    this.message = '';

    const data = {
      condition_name: this.currentCondition.condition_name,
      symptoms: this.currentCondition.symptoms,
      treatment_name: this.treatment.name,
      treatmentId: this.treatment.id
    };

    this.conditionService.update(this.currentCondition.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This condition was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCondition(): void {
    this.conditionService.delete(this.currentCondition.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/conditions']);
        },
        error: (e) => console.error(e)
      });
  }

}
