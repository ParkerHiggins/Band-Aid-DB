import { Component, Input, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from 'src/app/models/provider.model';
import { Treatment } from "../../models/treatment.model";

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})
export class ProviderDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProvider: Provider = {
    name: '',
    coverage_offered: '',
    phone_number: 0
  };

  message = '';

  treatment: Treatment = {};

  constructor(
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      console.log(this.currentProvider.name);
      this.message = '';
      this.getProvider(this.route.snapshot.params["id"]);
    }
  }

  updateTreatment(treatment: Treatment): void {
    this.treatment = treatment;
  }

  getProvider(id: string): void {
    console.log("getProvider w/ id:");
    console.log(id);
    this.providerService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProvider = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateProvider(): void {
    this.message = '';

    const data = {
      name: this.currentProvider.name,
      coverage_offered: this.treatment.name,
      phone_number: this.currentProvider.phone_number,
      treatmentId: this.treatment.id
    };

    this.providerService.update(this.currentProvider.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This provider was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteProvider(): void {
    this.providerService.delete(this.currentProvider.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/providers']);
        },
        error: (e) => console.error(e)
      });
  }

}
