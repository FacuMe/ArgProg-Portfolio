import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { PortfolioHeaderComponent } from '../portfolio-header/portfolio-header.component';
import { PortfolioAboutComponent } from '../portfolio-about/portfolio-about.component';
import { PortfolioSectionsComponent } from '../portfolio-sections/portfolio-sections.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterContentInit {

  constructor() { }

  @ViewChild('header')
  header!: PortfolioHeaderComponent  

  @ViewChild('about')
  about!: PortfolioAboutComponent  
  
  @ViewChild('sections')
  sections!: PortfolioSectionsComponent  

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    
    this.header.title = "HEADER";
    this.about.title = "ABOUT";
    this.sections.title = "ATR PERRO";
  }
}
