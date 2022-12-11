import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider.model';
import { ProviderService } from 'src/app/services/provider.service';

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

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
  }

  saveProvider(): void {
    const data = {
      name: this.provider.name,
      duration: this.provider.coverage_offered,
      cost: this.provider.phone_number
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
