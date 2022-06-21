import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-sections',
  templateUrl: './portfolio-sections.component.html',
  styleUrls: ['./portfolio-sections.component.css']
})
export class PortfolioSectionsComponent implements OnInit {

  title: string = "SECTIONS";

  constructor() { }

  ngOnInit(): void {
  }

}
