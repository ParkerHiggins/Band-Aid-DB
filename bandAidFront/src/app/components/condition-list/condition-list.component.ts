import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Condition } from 'src/app/models/condition.model';
import { ConditionService } from 'src/app/services/condition.service';

@Component({
  selector: 'app-conditions-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.css']
})
export class ConditionListComponent implements OnInit {

  @Input() inParent = false;
  @Output() selectCondition: EventEmitter<Condition> = new EventEmitter();

  conditions?: Condition[];
  currentCondition: Condition = {};
  currentIndex = -1;
  name = '';

  constructor(private conditionService: ConditionService) { }

  ngOnInit(): void {
    this.retrieveConditions();
  }

  retrieveConditions(): void {
    this.conditionService.getAll()
      .subscribe({
        next: (data) => {
          this.conditions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveConditions();
    this.currentCondition = {};
    this.currentIndex = -1;
  }

  setActiveCondition(condition: Condition, index: number): void {
    this.currentCondition = condition;
    this.currentIndex = index;
  }

  setActiveConditionChild(condition: Condition, index: number): void {
    this.currentCondition = condition;
    this.currentIndex = index;
    this.selectCondition.emit(this.currentCondition);
  }

  removeAllConditions(): void {
    this.conditionService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentCondition = {};
    this.currentIndex = -1;

    this.conditionService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.conditions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
