import { Component,inject, OnInit } from '@angular/core';
import { HousingLocationOneComponent } from '../housing-location-one/housing-location-one.component';
import { HousingLocationInterface } from '../housing-location-interface';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationOneComponent, CommonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


  export class HomeComponent implements OnInit {
    
    housingLocationList: HousingLocationInterface[] = [];
    filteredLocationList: HousingLocationInterface[] = [];
    originalHousingLocationList: HousingLocationInterface[] = [];    
    housingService: HousingService = inject(HousingService);  
  
    constructor() {}
  
    ngOnInit(): void {
      this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocationInterface[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
        this.originalHousingLocationList = [...housingLocationList]; // Made copy of list
       });
      }


      /* search bar */
      filterByInput(e: Event): void {    
      const inputElement = e.target as HTMLInputElement;
      const text = inputElement.value;
      
      if (!text || text === '') {
        this.filteredLocationList = this.housingLocationList;
      } else {
        this.filteredLocationList = this.housingLocationList.filter(location =>
          location.city.toLowerCase().includes(text.toLowerCase())
        );
      }
    }

    /*side bar opening and closing */
    openNav(): void {
      const sidebar = document.getElementById("mySidebar");
      const main = document.getElementById("main");
  
      if (sidebar && main) {
        sidebar.style.width = "250px";
        main.style.marginLeft = "250px";
      }
    }
  
    closeNav(): void {
      const sidebar = document.getElementById("mySidebar");
      const main = document.getElementById("main");
  
      if (sidebar && main) {
        sidebar.style.width = "0";
        main.style.marginLeft = "0";
      }
    }
 
    // Initial State of each filter   

    filterByWifi: boolean = false;
    filterByLaundry: boolean = false;
    filterByIl: boolean= false;
    filterByCa: boolean=false;
    filterByOr:boolean=false;
    filterByAl: boolean=false;      
    sortByPriceHighToLow: boolean = false;
    sortByPriceLowToHigh: boolean = false;
    sortByRoom: boolean =false;
    filterArrays :[] = []
  
    // Apply filters
  
    applyFilters() {
      let filteredList = [...this.originalHousingLocationList];
  
      if (this.filterByWifi) {
        filteredList = filteredList.filter( location => location.wifi === true)}
  
      if (this.filterByLaundry) {
        filteredList = filteredList.filter(location => location.laundry === true);
      }

      if (this.filterByIl){
        filteredList= filteredList.filter(location=>location.state=='IL')
      }
      if (this.filterByCa){
        filteredList= filteredList.filter(location=>location.state=='CA')
      }
      if (this.filterByAl){
        filteredList= filteredList.filter(location=>location.state=='AK')
      }
      if (this.filterByOr){
        filteredList= filteredList.filter(location=>location.state=='OR')
      }
  
      // Apply sorting
      if (this.sortByPriceHighToLow) {
        filteredList = filteredList.sort((a, b) => b.price - a.price);
      } 
      
      else if (this.sortByPriceLowToHigh) {
        filteredList= filteredList.sort((a, b) => a.price - b.price) ;}
      
      if (this.sortByRoom){
        filteredList= filteredList.sort((a,b)=> b.rooms- a.rooms )
      }
  
      this.filteredLocationList = filteredList
    }
  
    //Clickable events
    boxClicked(e: MouseEvent) {
      this.sortByPriceHighToLow = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    }
  
    priceLowToHigh(e: MouseEvent) {

      this.sortByPriceLowToHigh = (<HTMLInputElement>e.target).checked;
      this.applyFilters();

    }
    sortingByRoom(e: MouseEvent){
      this.sortByRoom = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    }
  
    wifiClicked(e: MouseEvent) {
      this.filterByWifi = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    }
  
    laundryAvailable(e: MouseEvent) {
      this.filterByLaundry = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    
    }
   
    stateAlaska(e: MouseEvent) {
      this.filterByAl = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    
    }
    stateCalifornia(e: MouseEvent) {
      this.filterByCa = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    
    }
    stateIllinois(e: MouseEvent) {
      this.filterByIl = (<HTMLInputElement>e.target).checked;
      this.applyFilters();
    
    }
    stateOrlando(e:MouseEvent){
      this.filterByOr= (<HTMLInputElement>e.target).checked;
      this.applyFilters()
    }   
  }
  