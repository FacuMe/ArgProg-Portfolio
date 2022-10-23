import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-portfolio-sections-education',
  templateUrl: './portfolio-sections-education.component.html',
  styleUrls: ['./portfolio-sections-education.component.css']
})
export class PortfolioSectionsEducationComponent implements OnInit {

  myEducations:any;
  showAddEducation:boolean = false;
  showModifyEducation:boolean[] = [];
  isLogged: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;

  institucion:string = "";
  nombre:string = "";
  fechaInicio:string = "";
  fechaFinalizacion:string = "";
  descripcion:string = "";
  estudioActual:boolean = false;
  urlFoto:string = "";

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.datosPortfolio.readEducation().subscribe(data =>{
      this.myEducations=data;

      for (let item of this.myEducations) {
        this.showModifyEducation[item.id] = false;
      }
      for (let item of this.myEducations) {
        if(item.urlFoto == null || item.urlFoto == ''){
          item.urlFoto = "/assets/yelloweduclogo3.png";
        }
        if(item.estudioActual){
          item.fechaFinalizacion = 'Presente';
        }
      }
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
  }

  onShowAddEducation(){
    this.showAddEducation = !this.showAddEducation;
  }

  onShowModifyEducation(item:any){
    this.showModifyEducation[item] = !this.showModifyEducation[item];
  }


  onSubmitAddEducation(){
    if(this.institucion.length === 0 || 
      this.nombre.length === 0 || 
      this.fechaInicio.length === 0 || 
      (this.fechaFinalizacion.length === 0 && !this.estudioActual) ||  
      this.descripcion.length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.institucion.length > 40 || 
      this.nombre.length > 40 || 
      this.fechaInicio.length > 40 || 
      this.fechaFinalizacion.length > 40 || 
      this.descripcion.length > 255 ||  
      this.urlFoto.length > 100) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    const { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto } = this;
    const addValues:any= { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto };
    this.datosPortfolio.createEducation(addValues).subscribe(
      () => {
        this.myEducations.push(addValues);
        this.datosPortfolio.readEducation().subscribe(data =>{
          this.myEducations=data;
          for (let item of this.myEducations) {
            if(item.urlFoto == null || item.urlFoto == ''){
              item.urlFoto = "/assets/yelloweduclogo3.png";
            }
            if(item.estudioActual){
              item.fechaFinalizacion = 'Presente';
            }
          }
        });
      }, err => {
        alert("No se pudo agregar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonEduc')?.click();
  }

  onSubmitModifyEducation(item:any){
    if(this.institucion.length === 0 || 
      this.nombre.length === 0 || 
      this.fechaInicio.length === 0 || 
      (this.fechaFinalizacion.length === 0 && !this.estudioActual) ||  
      this.descripcion.length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.institucion.length > 40 || 
      this.nombre.length > 40 || 
      this.fechaInicio.length > 40 || 
      this.fechaFinalizacion.length > 40 || 
      this.descripcion.length > 255 ||  
      this.urlFoto.length > 100) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    const { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto } = this;
    const modifValues:any= { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto };
    this.datosPortfolio.updateEducation(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readEducation().subscribe(data =>{
        this.myEducations=data;
        for (let item of this.myEducations) {
          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/yelloweduclogo3.png";
          }
          if(item.estudioActual){
            item.fechaFinalizacion = 'Presente';
          }
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonEduc' + item.id)?.click();
  }

  onDeleteEducation(item: any) {
    console.log(item);
    this.datosPortfolio.deleteEducation(item).subscribe(
      () => {
        this.myEducations = this.myEducations.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }, err => {
        alert("No se pudo eliminar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    document.getElementById('closeButtonEducationDelete' + item.id)?.click();
  }
}
