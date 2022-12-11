import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider.model';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-providers-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  providers?: Provider[];
  currentProvider: Provider = {};
  currentIndex = -1;
  name = '';

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.retrieveProviders();
  }

  retrieveProviders(): void {
    this.providerService.getAll()
      .subscribe({
        next: (data) => {
          this.providers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProviders();
    this.currentProvider = {};
    this.currentIndex = -1;
  }

  setActiveProvider(provider: Provider, index: number): void {
    this.currentProvider = provider;
    this.currentIndex = index;

    console.log("currentProvider - id");
    console.log(this.currentProvider.id);
    console.log("currentProvider - name");
    console.log(this.currentProvider.name);
    console.log("currentProvider - active");
    console.log(this.currentProvider);
    console.log("current Index - active");
    console.log(this.currentIndex);
  }

  removeAllProviders(): void {
    this.providerService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentProvider = {};
    this.currentIndex = -1;

    this.providerService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.providers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
