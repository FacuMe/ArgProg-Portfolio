import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-about',
  templateUrl: './portfolio-about.component.html',
  styleUrls: ['./portfolio-about.component.css']
})
export class PortfolioAboutComponent implements OnInit {

  title: string = "Acerca de";

  constructor() { }

  ngOnInit(): void {
  }

}
