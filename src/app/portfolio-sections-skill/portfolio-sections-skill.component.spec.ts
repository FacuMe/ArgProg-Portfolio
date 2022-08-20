import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSectionsSkillComponent } from './portfolio-sections-skill.component';

describe('PortfolioSectionsSkillComponent', () => {
  let component: PortfolioSectionsSkillComponent;
  let fixture: ComponentFixture<PortfolioSectionsSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioSectionsSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSectionsSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
