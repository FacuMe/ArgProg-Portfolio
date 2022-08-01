import { Component, OnInit } from '@angular/core';
import { Experience } from '../experience';
import { EXPERIENCES } from '../mock-experience';

@Component({
  selector: 'app-portfolio-sections',
  templateUrl: './portfolio-sections.component.html',
  styleUrls: ['./portfolio-sections.component.css']
})
export class PortfolioSectionsComponent implements OnInit {

  title: string = "SECTIONS";
  experiences: Experience[] = EXPERIENCES;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAdd(){

  }

}
