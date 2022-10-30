import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';
import { TokenService } from '../servicios/token.service';


@Component({
  selector: 'app-portfolio-sections-project',
  templateUrl: './portfolio-sections-project.component.html',
  styleUrls: ['./portfolio-sections-project.component.css']
})
export class PortfolioSectionsProjectComponent implements OnInit {

  myProjects:any;
  isLogged: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;

  nombre:string = "";
  entidad:string = "";
  fechaInicio:string = "";
  fechaFinalizacion:string = "";
  descripcion:string = "";
  proyectoActual:boolean = false;
  urlFoto:string = "";
  urlProyecto:string = "";

  nombreCargados:string [] = [];
  entidadCargados:string [] = [];
  fechaInicioCargados:string [] = [];
  fechaFinalizacionCargados:string [] = [];
  descripcionCargados:string [] = [];
  proyectoActualCargados:boolean [] = [];
  urlFotoCargados:string [] = [];
  urlProyectoCargados:string [] = [];

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.datosPortfolio.readProject().subscribe(data =>{
      this.myProjects=data;
      for (let item of this.myProjects) {
        this.nombreCargados[item.id] = item.nombre;
        this.entidadCargados[item.id] =item.entidad;
        this.fechaInicioCargados[item.id] = item.fechaInicio;
        this.fechaFinalizacionCargados[item.id] = item.fechaFinalizacion;
        this.descripcionCargados[item.id] = item.descripcion;
        this.proyectoActualCargados[item.id] = item.proyectoActual;
        this.urlFotoCargados[item.id] = item.urlFoto;
        this.urlProyectoCargados[item.id] = item.urlProyecto;

        if(item.urlFoto == null || item.urlFoto == ''){
          item.urlFoto = "/assets/leadbg2.jpg";
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

  onSubmitAddProject(){
    if(this.nombre.length === 0 || 
      this.entidad.length === 0 || 
      this.fechaInicio.length === 0 || 
      this.descripcion.length === 0 || 
      (this.fechaFinalizacion.length === 0 && !this.proyectoActual)) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.nombre.length > 40 || 
      this.entidad.length > 40 || 
      this.fechaInicio.length > 40 || 
      this.fechaFinalizacion.length > 40 || 
      this.descripcion.length > 255 || 
      this.urlFoto.length > 100 || 
      this.urlProyecto.length > 100) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    if(this.proyectoActual == true){
      this.fechaFinalizacion = "Presente";
    }
    const { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto } = this;
    const addValues:any= { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto };
    this.datosPortfolio.createProject(addValues).subscribe(
      () => {
        this.myProjects.push(addValues);
        this.datosPortfolio.readProject().subscribe(data =>{
          this.myProjects=data;
          for (let item of this.myProjects) {
            this.nombreCargados[item.id] = item.nombre;
            this.entidadCargados[item.id] =item.entidad;
            this.fechaInicioCargados[item.id] = item.fechaInicio;
            this.fechaFinalizacionCargados[item.id] = item.fechaFinalizacion;
            this.descripcionCargados[item.id] = item.descripcion;
            this.proyectoActualCargados[item.id] = item.proyectoActual;
            this.urlFotoCargados[item.id] = item.urlFoto;
            this.urlProyectoCargados[item.id] = item.urlProyecto;
            if(item.urlFoto == null || item.urlFoto == ''){
              item.urlFoto = "/assets/leadbg2.jpg";
            }
          }
        });
      }, err => {
        alert("No se pudo agregar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonProj')?.click();
  }

  onSubmitModifyProject(item:any){
    if(this.nombreCargados[item.id].length === 0 || 
      this.entidadCargados[item.id].length === 0 || 
      this.fechaInicioCargados[item.id].length === 0 ||  
      this.descripcionCargados[item.id].length === 0 ||  
      (this.fechaFinalizacionCargados[item.id].length === 0 && !this.proyectoActualCargados[item.id])) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.nombreCargados[item.id].length > 40 || 
      this.entidadCargados[item.id].length > 40 || 
      this.fechaInicioCargados[item.id].length > 40 || 
      this.fechaFinalizacionCargados[item.id].length > 40 || 
      this.descripcionCargados[item.id].length > 255 || 
      this.urlFotoCargados[item.id].length > 100 || 
      this.urlProyectoCargados[item.id].length > 100) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    if(this.proyectoActualCargados[item.id] == true){
      this.fechaFinalizacionCargados[item.id] = "Presente";
    }
    const nombre = this.nombreCargados[item.id];
    const entidad = this.entidadCargados[item.id];
    const fechaInicio = this.fechaInicioCargados[item.id]; 
    const fechaFinalizacion = this.fechaFinalizacionCargados[item.id];
    const descripcion = this.descripcionCargados[item.id];
    const proyectoActual = this.proyectoActualCargados[item.id];
    const urlFoto = this.urlFotoCargados[item.id];
    const urlProyecto = this.urlProyectoCargados[item.id];
    const modifValues:any= { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto };
    this.datosPortfolio.updateProject(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readProject().subscribe(data =>{
        this.myProjects=data;
        for (let item of this.myProjects) {
          this.nombreCargados[item.id] = item.nombre;
          this.entidadCargados[item.id] =item.entidad;
          this.fechaInicioCargados[item.id] = item.fechaInicio;
          this.fechaFinalizacionCargados[item.id] = item.fechaFinalizacion;
          this.descripcionCargados[item.id] = item.descripcion;
          this.proyectoActualCargados[item.id] = item.proyectoActual;
          this.urlFotoCargados[item.id] = item.urlFoto;
          this.urlProyectoCargados[item.id] = item.urlProyecto;
          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/leadbg2.jpg";
          }
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonProj' + item.id)?.click();
  }

  onDeleteProject(item: any) {
    console.log(item);
    this.datosPortfolio.deleteProject(item).subscribe(
      () => {
        this.myProjects = this.myProjects.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }, err => {
        alert("No se pudo eliminar, verifique estado de sesión e ingreso como usuario administrador");
      }
    );
    document.getElementById('closeButtonProjectDelete' + item.id)?.click();
  }
}
