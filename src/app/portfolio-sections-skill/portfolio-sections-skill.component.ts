import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-portfolio-sections-skill',
  templateUrl: './portfolio-sections-skill.component.html',
  styleUrls: ['./portfolio-sections-skill.component.css']
})
export class PortfolioSectionsSkillComponent implements OnInit {

  mySkills:any;
  showAddSkill:boolean = false;
  isLogged: boolean = false;

  nombre:string = "";
  porcentaje:string = "";
  color:string = "";

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

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

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }

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
    addValues.color = addValues.color.toString();
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
      }, err => {
        alert("No se pudo agregar, verifique si ha ingresado como usuario administrador");
      }
    );
  }

  onSubmitModifySkill(item:any){
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
    const modifValues:any= { nombre, porcentaje, color};
    modifValues.color = modifValues.color.toString();
    console.log(modifValues);
    this.datosPortfolio.updateSkill(item, modifValues).subscribe((response) => {
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
    }, err => {
      alert("No se pudo modificar, verifique si ha ingresado como usuario administrador");
    });
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
      }, err => {
        alert("No se pudo eliminar, verifique si ha ingresado como usuario administrador");
      }
    );
  }



}
