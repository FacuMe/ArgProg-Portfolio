import { Component, OnInit } from '@angular/core';
import { PortfolioHeaderComponent } from '../portfolio-header/portfolio-header.component';
import { PortfolioAboutComponent } from '../portfolio-about/portfolio-about.component';
import { PortfolioSectionsExperienceComponent } from '../portfolio-sections-experience/portfolio-sections-experience.component';
import { PortfolioSectionsEducationComponent } from '../portfolio-sections-education/portfolio-sections-education.component';
import { PortfolioSectionsSkillComponent } from '../portfolio-sections-skill/portfolio-sections-skill.component';
import { PortfolioSectionsProjectComponent } from '../portfolio-sections-project/portfolio-sections-project.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
