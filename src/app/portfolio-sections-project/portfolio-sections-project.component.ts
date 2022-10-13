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
      }
    });

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }

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
      this.fechaFinalizacion.length === 0 ||  
      this.descripcion.length === 0) {
      alert("Por favor completa todos los campos");
      return;
    }
    if(this.nombre.length > 255 || 
      this.entidad.length > 255 || 
      this.fechaInicio.length > 255 || 
      this.fechaFinalizacion.length > 255 || 
      this.descripcion.length > 255 || 
      this.urlFoto.length > 255 || 
      this.urlProyecto.length > 255) {
      alert("Máximo 255 caracteres por campo");
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
          }
        });
      }, err => {
        alert("No se pudo agregar, verifique si ha ingresado como usuario administrador");
      }
    );
  }

  onSubmitModifyProject(item:any){
    if(this.nombre.length === 0 || 
      this.entidad.length === 0 || 
      this.fechaInicio.length === 0 || 
      this.fechaFinalizacion.length === 0 ||  
      this.descripcion.length === 0) {
        alert("Por favor completa todos los campos");
      return;
    }
    if(this.nombre.length > 255 || 
      this.entidad.length > 255 || 
      this.fechaInicio.length > 255 || 
      this.fechaFinalizacion.length > 255 || 
      this.descripcion.length > 255 || 
      this.urlFoto.length > 255 || 
      this.urlProyecto.length > 255) {
        alert("Máximo 255 caracteres por campo");
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
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique si ha ingresado como usuario administrador");
    });
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
        alert("No se pudo eliminar, verifique si ha ingresado como usuario administrador");
      }
    );
  }
}
