import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-portfolio-about',
  templateUrl: './portfolio-about.component.html',
  styleUrls: ['./portfolio-about.component.css']
})
export class PortfolioAboutComponent implements OnInit {
  myProfile:any;
  descripcion:string = "";
  descripcionCargados: string [] = [];
  load:boolean = false;
  isLogged: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosPortfolio.readProfile().subscribe(data =>{
      this.myProfile=data;
      this.load = true;
      for (let profile of this.myProfile) {
        this.descripcionCargados[profile.id] = profile.descripcion; 
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

  onSubmitModifyProfile(item:any){
    if(this.descripcionCargados[item.id].length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.descripcionCargados[item.id].length > 255 ) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    const descripcion = this.descripcionCargados[item.id];
    const modifValues:any= { descripcion };
    this.datosPortfolio.updateProfile(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readProfile().subscribe(data =>{
        this.myProfile=data;
        for (let profile of this.myProfile) {
          this.descripcionCargados[profile.id] = profile.descripcion; 
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonProf')?.click();
  }

}
