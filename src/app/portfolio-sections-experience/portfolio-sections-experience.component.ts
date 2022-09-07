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
 

  puesto:string = "";
  empleador:string = "";
  fechaIngreso:string = "";
  fechaSalida:string = "";
  tipoEmpleo:string = "";
  descripcion:string = "";
  empleoActual:boolean = false;

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.datosPortfolio.readExperience().subscribe(data =>{
      this.myExperiences=data;
      for (let item of this.myExperiences) {
        this.showModifyExperience[item.id] = false;
      }
    });

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }

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
      this.fechaSalida.length === 0 || 
      this.tipoEmpleo.length === 0 || 
      this.descripcion.length === 0) {
      alert("Por favor completa todos los campos del empleo");
      return;
    }
    if(this.puesto.length > 255 || 
      this.empleador.length > 255 || 
      this.fechaIngreso.length > 255 || 
      this.fechaSalida.length > 255 || 
      this.tipoEmpleo.length > 255 || 
      this.descripcion.length > 255 ) {
      alert("Máximo 255 caracteres");
      return;
    }
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual } = this;
    const addValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual };
    this.datosPortfolio.createExperience(addValues).subscribe(
      () => {
        this.myExperiences.push(addValues);
        this.datosPortfolio.readExperience().subscribe(data =>{
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
      this.descripcion.length === 0) {
      alert("Por favor completa todos los campos del empleo");
      return;
    }
    if(this.puesto.length > 255 || 
      this.empleador.length > 255 || 
      this.fechaIngreso.length > 255 || 
      this.fechaSalida.length > 255 || 
      this.tipoEmpleo.length > 255 || 
      this.descripcion.length > 255 ) {
      alert("Máximo 255 caracteres");
      return;
    }
    const { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual } = this;
    const modifValues:any= { puesto, empleador, fechaIngreso, fechaSalida, tipoEmpleo, descripcion, empleoActual};
    this.datosPortfolio.updateExperience(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readExperience().subscribe(data =>{
        this.myExperiences=data;
      });
    });
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
      },
    );
  }

}
