import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

@Component({
  selector: 'app-portfolio-sections',
  templateUrl: './portfolio-sections.component.html',
  styleUrls: ['./portfolio-sections.component.css']
})
export class PortfolioSectionsComponent implements OnInit {
  myExperiences:any;
  myEducations:any;
  myProjects:any;
  mySkills:any;

  showAddExperience:boolean = false;
  showAddEducation:boolean = false;
  showAddSkill:boolean = false;
  showAddProject:boolean = false;
  showModifyExperience:boolean[] = [];
  showModifyEducation:boolean[] = [];
  showModifyProject:boolean[] = [];

  puesto:string = "";
  empleador:string = "";
  fechaIngreso:string = "";
  fechaSalida:string = "";
  tipoEmpleo:string = "";
  descripcionEmpleo:string = "";
  empleoActual:boolean = false;

  constructor(private datosPortfolio:PortfolioService) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos('/experiencia_laboral/').subscribe(data =>{
      this.myExperiences=data;
    });

    this.datosPortfolio.obtenerDatos('/educacion/').subscribe(data =>{
      this.myEducations=data;
    });

    this.datosPortfolio.obtenerDatos('/habilidad/').subscribe(data =>{
      this.mySkills=data;
    });

    this.datosPortfolio.obtenerDatos('/proyecto/').subscribe(data =>{
      this.myProjects=data;
    });

    for (let item of this.myExperiences) {
      this.showModifyExperience[item.id] = false;
    }

    for (let item of this.myEducations) {
      this.showModifyEducation[item.id] = false;
    }

    for (let item of this.myProjects) {
      this.showModifyProject[item.id] = false;
    }
  }

  onDeleteExperience(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemExperience(item).subscribe(
      () => {
        this.myExperiences = this.myExperiences.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      },
    );
  }

  onDeleteEducation(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemEducation(item).subscribe(
      () => {
        this.myEducations = this.myEducations.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }

  onDeleteSkill(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemSkill(item).subscribe(
      () => {
        this.mySkills = this.mySkills.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }

  onDeleteProject(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemProject(item).subscribe(
      () => {
        this.myProjects = this.myProjects.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }

  onShowAddExperience(){
    this.showAddExperience = !this.showAddExperience;
  }

  onShowAddEducation(){
    this.showAddEducation = !this.showAddEducation;
  }

  onShowAddSkill(){
    this.showAddSkill = !this.showAddSkill;
  }

  onShowAddProject(){
    this.showAddProject = !this.showAddProject;
  }

  onShowModifyExperience(item:any){
    this.showModifyExperience[item] = !this.showModifyExperience[item];
  }

  onShowModifyEducation(item:any){
    this.showModifyEducation[item] = !this.showModifyEducation[item];
  }

  onShowModifyProject(item:any){
    this.showModifyProject[item] = !this.showModifyProject[item];
  }

  onSubmitAddExperience(){
    if(this.puesto.length === 0 || 
      this.empleador.length === 0 || 
      this.fechaIngreso.length === 0 || 
      this.fechaSalida.length === 0 || 
      this.tipoEmpleo.length === 0 || 
      this.descripcionEmpleo.length === 0) {
      alert("Por favor completa todos los campos del empleo");
      return;
    }
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcionEmpleo, empleoActual } = this;
    const addValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcionEmpleo, empleoActual };
    this.datosPortfolio.addExperience(addValues).subscribe(
      () => {
        this.myExperiences.push(addValues);
        this.datosPortfolio.obtenerDatos('/experiencia_laboral/').subscribe(data =>{
          this.myExperiences=data;
        });
      },
    );
  }

  onSubmitModifyExperience(item:any){
    if(this.puesto.length === 0 || 
      this.empleador.length === 0 || 
      this.fechaIngreso.length === 0 || 
      this.fechaSalida.length === 0 || 
      this.tipoEmpleo.length === 0 || 
      this.descripcionEmpleo.length === 0) {
      alert("Por favor completa todos los campos del empleo");
      return;
    }
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcionEmpleo, empleoActual } = this;
    const modifValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcionEmpleo, empleoActual};
    this.datosPortfolio.updateExperience(item, modifValues).subscribe((response) => {
      this.datosPortfolio.obtenerDatos('/experiencia_laboral/').subscribe(data =>{
        this.myExperiences=data;
      });
    });
  }

}