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

  institucionCargados:string [] = [];
  nombreCargados:string [] = [];
  fechaInicioCargados:string [] = [];
  fechaFinalizacionCargados:string [] = [];
  descripcionCargados:string [] = [];
  estudioActualCargados:boolean [] = [];
  urlFotoCargados:string [] = [];

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.datosPortfolio.readEducation().subscribe(data =>{
      this.myEducations=data;
      for (let item of this.myEducations) {
        this.institucionCargados[item.id] = item.institucion;
        this.nombreCargados[item.id] =item.nombre;
        this.fechaInicioCargados[item.id] = item.fechaInicio;
        this.fechaFinalizacionCargados[item.id] = item.fechaFinalizacion;
        this.descripcionCargados[item.id] = item.descripcion;
        this.estudioActualCargados[item.id] = item.estudioActual;
        this.urlFotoCargados[item.id] = item.urlFoto;

        if(item.urlFoto == null || item.urlFoto == ''){
          item.urlFoto = "/assets/yelloweduclogo3.png";
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
    if(this.estudioActual == true){
      this.fechaFinalizacion = "Presente";
    }
    const { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto } = this;
    const addValues:any= { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto };
    this.datosPortfolio.createEducation(addValues).subscribe(
      () => {
        this.myEducations.push(addValues);
        this.datosPortfolio.readEducation().subscribe(data =>{
          this.myEducations=data;
          for (let item of this.myEducations) {
            this.institucionCargados[item.id] = item.institucion;
            this.nombreCargados[item.id] =item.nombre;
            this.fechaInicioCargados[item.id] = item.fechaInicio;
            this.fechaFinalizacionCargados[item.id] = item.fechaFinalizacion;
            this.descripcionCargados[item.id] = item.descripcion;
            this.estudioActualCargados[item.id] = item.estudioActual;
            this.urlFotoCargados[item.id] = item.urlFoto;
            if(item.urlFoto == null || item.urlFoto == ''){
              item.urlFoto = "/assets/yelloweduclogo3.png";
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
    this.institucion = "";
    this.nombre = "";
    this.fechaInicio = "";
    this.fechaFinalizacion = "";
    this.descripcion = "";
    this.estudioActual = false;
    this.urlFoto = "";
  }

  onSubmitModifyEducation(item:any){
    if(this.institucionCargados[item.id].length === 0 || 
      this.nombreCargados[item.id].length === 0 || 
      this.fechaInicioCargados[item.id].length === 0 || 
      (this.fechaFinalizacionCargados[item.id].length === 0 && !this.estudioActualCargados[item.id]) ||  
      this.descripcionCargados[item.id].length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.institucionCargados[item.id].length > 40 || 
      this.nombreCargados[item.id].length > 40 || 
      this.fechaInicioCargados[item.id].length > 40 || 
      this.fechaFinalizacionCargados[item.id].length > 40 || 
      this.descripcionCargados[item.id].length > 255 ||  
      this.urlFotoCargados[item.id].length > 100) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    if(this.estudioActualCargados[item.id] == true){
      this.fechaFinalizacionCargados[item.id] = "Presente";
    }
    const institucion = this.institucionCargados[item.id];
    const nombre = this.nombreCargados[item.id];
    const fechaInicio = this.fechaInicioCargados[item.id]; 
    const fechaFinalizacion = this.fechaFinalizacionCargados[item.id];
    const descripcion = this.descripcionCargados[item.id];
    const estudioActual = this.estudioActualCargados[item.id];
    const urlFoto = this.urlFotoCargados[item.id];
    const modifValues:any= { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto };
    this.datosPortfolio.updateEducation(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readEducation().subscribe(data =>{
        this.myEducations=data;
        for (let item of this.myEducations) {
          this.institucionCargados[item.id] = item.institucion;
          this.nombreCargados[item.id] =item.nombre;
          this.fechaInicioCargados[item.id] = item.fechaInicio;
          this.fechaFinalizacionCargados[item.id] = item.fechaFinalizacion;
          this.descripcionCargados[item.id] = item.descripcion;
          this.estudioActualCargados[item.id] = item.estudioActual;
          this.urlFotoCargados[item.id] = item.urlFoto;

          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/yelloweduclogo3.png";
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
