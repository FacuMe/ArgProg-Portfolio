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
  showModifyProfile:boolean = false;
  descripcion:string = "";
  load:boolean = false;
  isLogged: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosPortfolio.readProfile().subscribe(data =>{
      this.myProfile=data;
      this.load = true;
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

  onShowModifyProfile(){
    this.showModifyProfile = !this.showModifyProfile;
  }

  onSubmitModifyProfile(item:any){
    if(this.descripcion.length === 0) {
      this.errorValidation1 = true;
      this.errorValidation2 = false;
      return;
    }
    if(this.descripcion.length > 255 ) {
      this.errorValidation1 = false;
      this.errorValidation2 = true;
      return;
    }
    const { descripcion } = this;
    const modifValues:any= { descripcion };
    this.datosPortfolio.updateProfile(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readProfile().subscribe(data =>{
        this.myProfile=data;
      });
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonProf')?.click();
  }

}
