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

  onShowModifyProfile(){
    this.showModifyProfile = !this.showModifyProfile;
  }

  onSubmitModifyProfile(item:any){
    if(this.descripcion.length === 0) {
      alert("Por favor completa la descripción del perfil");
      return;
    }
    if(this.descripcion.length > 255 ) {
      alert("Máximo 255 caracteres");
      return;
    }
    const { descripcion } = this;
    const modifValues:any= { descripcion };
    this.datosPortfolio.updateProfile(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readProfile().subscribe(data =>{
        this.myProfile=data;
      });
    }, err => {
      alert("No se pudo modificar, verifique si ha ingresado como usuario administrador");
    });
  }

}
