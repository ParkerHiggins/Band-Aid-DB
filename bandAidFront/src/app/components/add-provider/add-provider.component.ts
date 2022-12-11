import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider.model';
import { ProviderService } from 'src/app/services/provider.service';
import {Treatment} from "../../models/treatment.model";

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {

  provider: Provider = {
    name: '',
    coverage_offered: '',
    phone_number: 0
  };
  submitted = false;

  treatment: Treatment = {};

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
  }

  updateTreatment(treatment: Treatment): void {
    this.treatment = treatment;
  }

  saveProvider(): void {
    const data = {
      name: this.provider.name,
      coverage_offered: this.treatment.name,
      phone_number: this.provider.phone_number,
      treatmentId: this.treatment.id
    };

    this.providerService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newProvider(): void {
    this.submitted = false;
    this.provider = {
      name: '',
      coverage_offered: '',
      phone_number: 0
    };
  }

}
