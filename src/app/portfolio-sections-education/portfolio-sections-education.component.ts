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
          item.urlFoto = "/assets/yelloweduclogo2.png";
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
      this.fechaFinalizacion.length === 0 ||  
      this.descripcion.length === 0) {
      alert("Por favor completa todos los campos del estudio");
      return;
    }
    if(this.institucion.length > 255 || 
      this.nombre.length > 255 || 
      this.fechaInicio.length > 255 || 
      this.fechaFinalizacion.length > 255 || 
      this.descripcion.length > 255 ||  
      this.urlFoto.length > 255) {
      alert("Máximo 255 caracteres");
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
              item.urlFoto = "/assets/yelloweduclogo2.png";
            }
          }
        });
      }, err => {
        alert("No se pudo agregar, verifique si ha ingresado como usuario administrador");
      }
    );
  }

  onSubmitModifyEducation(item:any){
    if(this.institucion.length === 0 || 
      this.nombre.length === 0 || 
      this.fechaInicio.length === 0 || 
      this.fechaFinalizacion.length === 0 ||  
      this.descripcion.length === 0) {
      alert("Por favor modifica todos los campos del estudio");
      return;
    }
    if(this.institucion.length > 255 || 
      this.nombre.length > 255 || 
      this.fechaInicio.length > 255 || 
      this.fechaFinalizacion.length > 255 || 
      this.descripcion.length > 255 ||  
      this.urlFoto.length > 255) {
      alert("Máximo 255 caracteres");
      return;
    }
    const { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto } = this;
    const modifValues:any= { institucion, nombre,  fechaInicio, fechaFinalizacion, descripcion, estudioActual, urlFoto };
    this.datosPortfolio.updateEducation(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readEducation().subscribe(data =>{
        this.myEducations=data;
        for (let item of this.myEducations) {
          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/yelloweduclogo2.png";
          }
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique si ha ingresado como usuario administrador");
    });
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
        alert("No se pudo eliminar, verifique si ha ingresado como usuario administrador");
      }
    );
  }
}
