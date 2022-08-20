import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSectionsProjectComponent } from './portfolio-sections-project.component';

describe('PortfolioSectionsProjectComponent', () => {
  let component: PortfolioSectionsProjectComponent;
  let fixture: ComponentFixture<PortfolioSectionsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioSectionsProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSectionsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
