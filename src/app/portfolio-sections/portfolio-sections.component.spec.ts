import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSectionsComponent } from './portfolio-sections.component';

describe('PortfolioSectionsComponent', () => {
  let component: PortfolioSectionsComponent;
  let fixture: ComponentFixture<PortfolioSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
