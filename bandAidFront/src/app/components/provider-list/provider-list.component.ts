import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Provider } from 'src/app/models/provider.model';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-providers-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  @Input() inParent = false;
  @Output() selectProvider: EventEmitter<Provider> = new EventEmitter();

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
  }

  setActiveProviderChild(provider: Provider, index: number): void {
    this.currentProvider = provider;
    this.currentIndex = index;
    this.selectProvider.emit(this.currentProvider);
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
