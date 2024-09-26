import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingLocationOneComponent } from './housing-location-one.component';

describe('HousingLocationOneComponent', () => {
  let component: HousingLocationOneComponent;
  let fixture: ComponentFixture<HousingLocationOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingLocationOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousingLocationOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
