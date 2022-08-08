import { Component, OnInit } from '@angular/core';
import { PortfolioHeaderComponent } from '../portfolio-header/portfolio-header.component';
import { PortfolioAboutComponent } from '../portfolio-about/portfolio-about.component';
import { PortfolioSectionsComponent } from '../portfolio-sections/portfolio-sections.component';

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
