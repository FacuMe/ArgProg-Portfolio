import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSectionsEducationComponent } from './portfolio-sections-education.component';

describe('PortfolioSectionsEducationComponent', () => {
  let component: PortfolioSectionsEducationComponent;
  let fixture: ComponentFixture<PortfolioSectionsEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioSectionsEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSectionsEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
