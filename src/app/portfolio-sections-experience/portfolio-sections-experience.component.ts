import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-portfolio-sections-experience',
  templateUrl: './portfolio-sections-experience.component.html',
  styleUrls: ['./portfolio-sections-experience.component.css']
})
export class PortfolioSectionsExperienceComponent implements OnInit {

  myExperiences:any;
  isLogged: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;

  puesto:string = "";
  empleador:string = "";
  fechaIngreso:string = "";
  fechaSalida:string = "";
  tipoEmpleo:string = "";
  descripcion:string = "";
  empleoActual:boolean = false;
  urlFoto:string = "";

  puestosCargados:string [] = [];
  empleadorCargados:string [] = [];
  fechaIngresoCargados:string [] = [];
  fechaSalidaCargados:string [] = [];
  tipoEmpleoCargados:string [] = [];
  descripcionCargados:string [] = [];
  empleoActualCargados:boolean [] = [];
  urlFotoCargados:string [] = [];

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.datosPortfolio.readExperience().subscribe(data =>{
      this.myExperiences=data;

      for (let item of this.myExperiences) {

        this.puestosCargados[item.id] = item.puesto;
        this.empleadorCargados[item.id] =item.empleador;
        this.fechaIngresoCargados[item.id] = item.fechaIngreso;
        this.fechaSalidaCargados[item.id] = item.fechaSalida;
        this.tipoEmpleoCargados[item.id] = item.tipoEmpleo;
        this.descripcionCargados[item.id] = item.descripcion;
        this.urlFotoCargados[item.id] = item.urlFoto;

        if(item.urlFoto == null || item.urlFoto == ''){
          item.urlFoto = "/assets/yellowjoblogo3.png";
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

  onSubmitAddExperience(){
    if(this.puesto.length === 0 || 
      this.empleador.length === 0 || 
      this.fechaIngreso.length === 0 || 
      (this.fechaSalida.length === 0 && !this.empleoActual) || 
      this.tipoEmpleo.length === 0 || 
      this.descripcion.length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.puesto.length > 40 || 
      this.empleador.length > 40 || 
      this.fechaIngreso.length > 40 || 
      this.fechaSalida.length > 40 || 
      this.tipoEmpleo.length > 40 || 
      this.descripcion.length > 255 || 
      this.urlFoto.length > 100 ) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    if(this.empleoActual == true){
      this.fechaSalida = "Presente";
    }
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto } = this;
    const addValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto };
    this.datosPortfolio.createExperience(addValues).subscribe(
      () => {
        this.myExperiences.push(addValues);
        this.datosPortfolio.readExperience().subscribe(data =>{
          this.myExperiences=data;
          for (let item of this.myExperiences) {
            this.puestosCargados[item.id] = item.puesto;
            this.empleadorCargados[item.id] =item.empleador;
            this.fechaIngresoCargados[item.id] = item.fechaIngreso;
            this.fechaSalidaCargados[item.id] = item.fechaSalida;
            this.tipoEmpleoCargados[item.id] = item.tipoEmpleo;
            this.descripcionCargados[item.id] = item.descripcion;
            this.urlFotoCargados[item.id] = item.urlFoto;
            if(item.urlFoto == null || item.urlFoto == ''){
              item.urlFoto = "/assets/yellowjoblogo3.png";
            }
          }
        });
      }, err => {
        alert("No se pudo agregar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonExp')?.click();
    this.puesto = "";
    this.empleador = "";
    this.fechaIngreso = "";
    this.fechaSalida = "";
    this.tipoEmpleo = "";
    this.descripcion = "";
    this.empleoActual = false;
    this.urlFoto = "";

  }

  onSubmitModifyExperience(item:any){
    if(this.puestosCargados[item.id].length === 0 || 
      this.empleadorCargados[item.id].length === 0 || 
      this.fechaIngresoCargados[item.id].length === 0 || 
      (this.fechaSalidaCargados[item.id].length === 0 && !this.empleoActualCargados[item.id]) || 
      this.tipoEmpleoCargados[item.id].length === 0 || 
      this.descripcionCargados[item.id].length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.puestosCargados[item.id].length > 40 || 
      this.empleadorCargados[item.id].length > 40 || 
      this.fechaIngresoCargados[item.id].length > 40 || 
      this.fechaSalidaCargados[item.id].length > 40 || 
      this.tipoEmpleoCargados[item.id].length > 40 || 
      this.descripcionCargados[item.id].length > 255 || 
      this.urlFotoCargados[item.id].length > 100 ) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    if(this.empleoActualCargados[item.id] == true){
      this.fechaSalidaCargados[item.id] = "Presente";
    }
    const puesto = this.puestosCargados[item.id];
    const empleador = this.empleadorCargados[item.id];
    const fechaIngreso = this.fechaIngresoCargados[item.id]; 
    const fechaSalida = this.fechaSalidaCargados[item.id];
    const tipoEmpleo = this.tipoEmpleoCargados[item.id];
    const descripcion = this.descripcionCargados[item.id];
    const empleoActual = this.empleoActualCargados[item.id];
    const urlFoto = this.urlFotoCargados[item.id];
    const modifValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto};
    this.datosPortfolio.updateExperience(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readExperience().subscribe(data =>{
        this.myExperiences=data;
        for (let item of this.myExperiences) {
          this.puestosCargados[item.id] = item.puesto;
          this.empleadorCargados[item.id] =item.empleador;
          this.fechaIngresoCargados[item.id] = item.fechaIngreso;
          this.fechaSalidaCargados[item.id] = item.fechaSalida;
          this.tipoEmpleoCargados[item.id] = item.tipoEmpleo;
          this.descripcionCargados[item.id] = item.descripcion;
          this.urlFotoCargados[item.id] = item.urlFoto;
          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/yellowjoblogo3.png";
          }
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonExp' + item.id)?.click();
  }

  onDeleteExperience(item: any) {
    this.datosPortfolio.deleteExperience(item).subscribe(
      () => {
        this.myExperiences = this.myExperiences.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }, err => {
        alert("No se pudo eliminar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    document.getElementById('closeButtonExperienceDelete' + item.id)?.click();
  }

}
