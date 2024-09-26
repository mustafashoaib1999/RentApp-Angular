import { Component, inject } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocationInterface } from '../housing-location-interface';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgFor, CurrencyPipe,UpperCasePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent{
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocationInterface | undefined;

  constructor(private location: Location) {
    
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);

    this.housingService.getHousingLocationById(housingLocationId)
    .then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  applyForm: FormGroup = new FormGroup({

    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl ('',[Validators.required, Validators.email])

  })

  submitApplication(): void {
    if (this.applyForm?.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );}
  }  
  goBack() {
    this.location.back();
  }
  
}

