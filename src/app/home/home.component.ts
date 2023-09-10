import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
  <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

filterResults(text: string) {
  if (!text) {
    this.filteredLocationList = this.housingLocationList;
  }

  this.filteredLocationList = this.housingLocationList.filter(
    housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
  );
}

  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.filteredLocationList = this.housingLocationList;
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

}
