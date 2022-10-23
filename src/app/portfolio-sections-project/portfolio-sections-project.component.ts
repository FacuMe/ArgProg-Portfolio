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
  showAddProject:boolean = false;
  showModifyProject:boolean[] = [];
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

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.datosPortfolio.readProject().subscribe(data =>{
      this.myProjects=data;

      for (let item of this.myProjects) {
        this.showModifyProject[item.id] = false;
      }
      for (let item of this.myProjects) {
        if(item.urlFoto == null || item.urlFoto == ''){
          item.urlFoto = "/assets/leadbg2.jpg";
        }
        if(item.proyectoActual){
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

  onShowAddProject(){
    this.showAddProject = !this.showAddProject;
  }

  onShowModifyProject(item:any){
    this.showModifyProject[item] = !this.showModifyProject[item];
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
    const { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto } = this;
    const addValues:any= { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto };
    this.datosPortfolio.createProject(addValues).subscribe(
      () => {
        this.myProjects.push(addValues);
        this.datosPortfolio.readProject().subscribe(data =>{
          this.myProjects=data;
          for (let item of this.myProjects) {
            if(item.urlFoto == null || item.urlFoto == ''){
              item.urlFoto = "/assets/leadbg2.jpg";
            }
            if(item.proyectoActual){
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
    document.getElementById('closeButtonProj')?.click();
  }

  onSubmitModifyProject(item:any){
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
    const { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto } = this;
    const modifValues:any= { nombre, entidad,  fechaInicio, fechaFinalizacion, descripcion, proyectoActual, urlFoto, urlProyecto };
    this.datosPortfolio.updateProject(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readProject().subscribe(data =>{
        this.myProjects=data;
        for (let item of this.myProjects) {
          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/leadbg2.jpg";
          }
          if(item.proyectoActual){
              item.fechaFinalizacion = 'Presente';
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
