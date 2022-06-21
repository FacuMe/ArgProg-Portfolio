import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.css']
})
export class PortfolioHeaderComponent implements OnInit {

  title: string = "Facundo Menéndez";

  constructor() { }

  ngOnInit(): void {
  }

}
