import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSectionsExperienceComponent } from './portfolio-sections-experience.component';

describe('PortfolioSectionsComponent', () => {
  let component: PortfolioSectionsExperienceComponent;
  let fixture: ComponentFixture<PortfolioSectionsExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioSectionsExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSectionsExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
