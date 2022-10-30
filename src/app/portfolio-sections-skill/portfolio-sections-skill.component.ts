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
  isLogged: boolean = false;
  isLoad: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;
  errorValidation3: boolean = false;

  nombre:string = "";
  porcentaje:string = "";
  color:string = "";

  nombreCargados:string [] = [];
  porcentajeCargados:string [] = [];
  colorCargados:string [] = [];

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.datosPortfolio.readSkill().subscribe(data =>{
      this.mySkills=data;
      for(let skill of this.mySkills){
        this.nombreCargados[skill.id] = skill.nombre;
        this.porcentajeCargados[skill.id] = skill.porcentaje;
        this.colorCargados[skill.id] = skill.color;

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
      this.isLoad = !this.isLoad;
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
    this.isLoad = !this.isLoad;
    const { nombre, porcentaje, color } = this;
    const addValues:any= { nombre, porcentaje, color };
    addValues.color = addValues.color.toString();
    this.datosPortfolio.createSkill(addValues).subscribe(
      () => {
        this.mySkills.push(addValues);
        this.datosPortfolio.readSkill().subscribe(data =>{
          this.mySkills=data;
          for(let skill of this.mySkills){
            this.nombreCargados[skill.id] = skill.nombre;
            this.porcentajeCargados[skill.id] = skill.porcentaje;
            this.colorCargados[skill.id] = skill.color;

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
    this.isLoad = !this.isLoad;
    document.getElementById('closeButtonSkill')?.click();
  }

  onSubmitModifySkill(item:any){
    if(this.nombreCargados[item.id].length === 0 || 
      this.porcentajeCargados[item.id].length === 0 || 
      this.colorCargados[item.id].length === 0) {
        this.errorValidation1 = true;
        this.errorValidation2 = false;
        this.errorValidation3 = false;
        return;
    }
    if(this.nombreCargados[item.id].length > 40) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      this.errorValidation3 = false;
      return;
    }
    if(Number(this.porcentajeCargados[item.id]) < 0 || Number(this.porcentajeCargados[item.id]) > 100 || Number.isNaN(Number(this.porcentajeCargados[item.id]))) {
      this.errorValidation1 = false;
      this.errorValidation2 = false;
      this.errorValidation3 = true;
      return;
    }
    const nombre = this.nombreCargados[item.id];
    const porcentaje = this.porcentajeCargados[item.id];
    const color = this.colorCargados[item.id];
    const modifValues:any= { nombre, porcentaje, color};
    modifValues.color = modifValues.color.toString();
    this.datosPortfolio.updateSkill(item, modifValues).subscribe((response) => {
      this.isLoad = !this.isLoad;
      this.datosPortfolio.readSkill().subscribe(data =>{
        this.mySkills=data;
        for(let skill of this.mySkills){
          this.nombreCargados[skill.id] = skill.nombre;
          this.porcentajeCargados[skill.id] = skill.porcentaje;
          this.colorCargados[skill.id] = skill.color;

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
      this.isLoad = !this.isLoad;
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    this.errorValidation3 = false;
    document.getElementById('closeButtonSkill' + item.id)?.click();
  }

  onDeleteSkill(item: any) {
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
