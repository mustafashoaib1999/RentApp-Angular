

import { Component, Input } from '@angular/core';
import { HousingLocationInterface } from '../housing-location-interface';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-housing-location-one',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CurrencyPipe],
  templateUrl: './housing-location-one.component.html',
  styleUrl: './housing-location-one.component.css'
})
export class HousingLocationOneComponent {
  @Input () housingLocationChild!: HousingLocationInterface

}
