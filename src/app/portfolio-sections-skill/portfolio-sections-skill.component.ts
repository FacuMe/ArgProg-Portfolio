import { NumberFormatStyle, NumberSymbol } from '@angular/common';
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
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;
  errorValidation3: boolean = false;

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

  resetValidations(){
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    this.errorValidation3 = false;
  }

  onShowAddSkill(){
    this.showAddSkill = !this.showAddSkill;
  }

  onSubmitAddSkill(){
    if(this.nombre.length === 0 || 
      this.porcentaje.length === 0 || 
      this.color.length === 0) {
        this.errorValidation1 = true;
        this.errorValidation2 = false;
        this.errorValidation3 = false;
        return;
    }
    if(this.nombre.length > 40) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      this.errorValidation3 = false;
      return;
    }
    if(Number(this.porcentaje) < 0 || Number(this.porcentaje) > 100 || Number.isNaN(Number(this.porcentaje))) {
      this.errorValidation1 = false;
      this.errorValidation2 = false;
      this.errorValidation3 = true;
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
        alert("No se pudo agregar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    this.errorValidation3 = false;
    document.getElementById('closeButtonSkill')?.click();
  }

  onSubmitModifySkill(item:any){
    if(this.nombre.length === 0 || 
      this.porcentaje.length === 0 || 
      this.color.length === 0) {
        this.errorValidation1 = true;
        this.errorValidation2 = false;
        this.errorValidation3 = false;
        return;
    }
    if(this.nombre.length > 40) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      this.errorValidation3 = false;
      return;
    }
    if(Number(this.porcentaje) < 0 || Number(this.porcentaje) > 100 || Number.isNaN(Number(this.porcentaje))) {
      this.errorValidation1 = false;
      this.errorValidation2 = false;
      this.errorValidation3 = true;
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
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    this.errorValidation3 = false;
    document.getElementById('closeButtonSkill' + item.id)?.click();
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
        alert("No se pudo eliminar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    document.getElementById('closeButtonSkillDelete' + item.id)?.click();
  }



}
