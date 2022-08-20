import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

@Component({
  selector: 'app-portfolio-sections-skill',
  templateUrl: './portfolio-sections-skill.component.html',
  styleUrls: ['./portfolio-sections-skill.component.css']
})
export class PortfolioSectionsSkillComponent implements OnInit {

  mySkills:any;
  showAddSkill:boolean = false;

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos('/habilidad/').subscribe(data =>{
      this.mySkills=data;
    });

  }

  onDeleteSkill(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemSkill(item).subscribe(
      () => {
        this.mySkills = this.mySkills.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }

  onShowAddSkill(){
    this.showAddSkill = !this.showAddSkill;
  }

}
