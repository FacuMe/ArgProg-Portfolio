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
  showAddExperience:boolean = false;
  showModifyExperience:boolean[] = [];
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

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.datosPortfolio.readExperience().subscribe(data =>{
      this.myExperiences=data;
      for (let item of this.myExperiences) {
        this.showModifyExperience[item.id] = false;
      }
      for (let item of this.myExperiences) {
        if(item.urlFoto == null || item.urlFoto == ''){
          item.urlFoto = "/assets/yellowjoblogo3.png";
        }
        if(item.empleoActual){
          item.fechaSalida = 'Presente';
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

  onShowAddExperience(){
    this.showAddExperience = !this.showAddExperience;
  }

  onShowModifyExperience(item:any){
    this.showModifyExperience[item] = !this.showModifyExperience[item];
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
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto } = this;
    const addValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto };
    this.datosPortfolio.createExperience(addValues).subscribe(
      () => {
        this.myExperiences.push(addValues);
        this.datosPortfolio.readExperience().subscribe(data =>{
          this.myExperiences=data;
          for (let item of this.myExperiences) {
            if(item.urlFoto == null || item.urlFoto == ''){
              item.urlFoto = "/assets/yellowjoblogo3.png";
            }
            if(item.empleoActual){
              item.fechaSalida = 'Presente';
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
  }

  onSubmitModifyExperience(item:any){
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
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto } = this;
    const modifValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual, urlFoto};
    this.datosPortfolio.updateExperience(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readExperience().subscribe(data =>{
        this.myExperiences=data;
        for (let item of this.myExperiences) {
          if(item.urlFoto == null || item.urlFoto == ''){
            item.urlFoto = "/assets/yellowjoblogo3.png";
          }
          if(item.empleoActual){
            item.fechaSalida = 'Presente';
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
    console.log(item);
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
