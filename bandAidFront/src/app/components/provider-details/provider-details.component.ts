import { Component, Input, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from 'src/app/models/provider.model';

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

  // todo: might need to get rid of this sone
  // updatePublished(status: boolean): void {
  //   const data = {
  //     name: this.currentProvider.name,
  //     description: this.currentProvider.description,
  //     published: status
  //   };
  //
  //   this.message = '';
  //
  //   this.providerService.update(this.currentProvider.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentProvider.published = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  updateProvider(): void {
    this.message = '';

    this.providerService.update(this.currentProvider.id, this.currentProvider)
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
