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

  nombre:string = "";
  porcentaje:string = "";
  color:string = "";

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.readSkill().subscribe(data =>{
      this.mySkills=data;
      for(let skill of this.mySkills){
        if(skill.color == "Rojo"){
          skill.color = "#FF5370";
        }
        else if(skill.color == "Azul"){
          skill.color = "#4099ff";
        }
        else if(skill.color == "Verde"){
          skill.color = "#2ed8b6";
        }
        else if(skill.color == "Amarillo"){
          skill.color = "#FFB64D";
        }
        else if(skill.color == "Rosa"){
          skill.color = "pink";
        }
      };
    });

  }

  onShowAddSkill(){
    this.showAddSkill = !this.showAddSkill;
  }

  onSubmitAddSkill(){
    if(this.nombre.length === 0 || 
      this.porcentaje.length === 0 || 
      this.color.length === 0) {
      alert("Por favor completa todos los campos de la habilidad");
      return;
    }
    if(this.nombre.length > 255) {
      alert("Máximo 255 caracteres");
      return;
    }
    if(this.porcentaje.length > 3) {
      alert("Ingresar porcentaje válido (0-100)");
      return;
    }
    const { nombre, porcentaje, color } = this;
    const addValues:any= { nombre, porcentaje, color };
    this.datosPortfolio.createSkill(addValues).subscribe(
      () => {
        this.mySkills.push(addValues);
        this.datosPortfolio.readSkill().subscribe(data =>{
          this.mySkills=data;
          for(let skill of this.mySkills){
            if(skill.color == "Rojo"){
              skill.color = "#FF5370";
            }
            else if(skill.color == "Azul"){
              skill.color = "#4099ff";
            }
            else if(skill.color == "Verde"){
              skill.color = "#2ed8b6";
            }
            else if(skill.color == "Amarillo"){
              skill.color = "#FFB64D";
            }
            else if(skill.color == "Rosa"){
              skill.color = "pink";
            }
          };
        });
      },
    );
  }

  onDeleteSkill(item: any) {
    console.log(item);
    this.datosPortfolio.deleteSkill(item).subscribe(
      () => {
        this.mySkills = this.mySkills.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }


}
