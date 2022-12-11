import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Treatment } from 'src/app/models/treatment.model';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-treatments-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {

  @Input() inParent = false;
  @Output() selectTreatment: EventEmitter<Treatment> = new EventEmitter();

  treatments?: Treatment[];
  currentTreatment: Treatment = {};
  currentIndex = -1;
  name = '';

  constructor(private treatmentService: TreatmentService) { }

  ngOnInit(): void {
    this.retrieveTreatments();
  }

  retrieveTreatments(): void {
    this.treatmentService.getAll()
      .subscribe({
        next: (data) => {
          this.treatments = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTreatments();
    this.currentTreatment = {};
    this.currentIndex = -1;
  }

  setActiveTreatment(treatment: Treatment, index: number): void {
    this.currentTreatment = treatment;
    this.currentIndex = index;
  }

  setActiveTreatmentChild(treatment: Treatment, index: number): void {
    this.currentTreatment = treatment;
    this.currentIndex = index;
    this.selectTreatment.emit(this.currentTreatment);
  }

  removeAllTreatments(): void {
    this.treatmentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentTreatment = {};
    this.currentIndex = -1;

    this.treatmentService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.treatments = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
