import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

@Component({
  selector: 'app-portfolio-sections',
  templateUrl: './portfolio-sections.component.html',
  styleUrls: ['./portfolio-sections.component.css']
})
export class PortfolioSectionsComponent implements OnInit {
  myExperience:any;
  myEducation:any;
  myProject:any;
  mySkill:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.myExperience=data.persona.experiencia_laboral;
      this.myEducation=data.persona.educacion;
      this.myProject=data.persona.proyecto;
      this.mySkill=data.persona.habilidad;
    });
  }

}
