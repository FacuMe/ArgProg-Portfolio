import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.css']
})
export class PortfolioHeaderComponent implements OnInit {
  myPortfolio:any;
  showModifyUser:boolean = false;
  load:boolean = false;
  isLogged: boolean = false;
  errorValidation1: boolean = false;
  errorValidation2: boolean = false;


  nombre:string = "";
  apellido:string = "";
  descripcion1:string = "";
  descripcion2:string = "";
  fechaNacimiento:string = "";
  domicilio:string = "";
  urlFotoPerfil:string = "";
  correoElectronico:string = "";

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosPortfolio.readUser().subscribe(data =>{
      this.myPortfolio=data;
      this.load = true;
      for (let user of this.myPortfolio) {
        if(user.urlFotoPerfil == null || user.urlFotoPerfil == ''){
          user.urlFotoPerfil = "/assets/NoPicture-500x500.jpg";
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

  onShowModifyUser() {
    this.showModifyUser = !this.showModifyUser;
  }

  onSubmitModifyUser(item:any){
    if(this.nombre.length === 0 || 
      this.apellido.length === 0 || 
      this.descripcion1.length === 0 || 
      this.fechaNacimiento.length === 0 || 
      this.domicilio.length === 0 ||   
      this.correoElectronico.length === 0) {
        this.errorValidation1 = true;
        this.errorValidation2 = false;
        return;
    }
    if(this.nombre.length > 40 || 
      this.apellido.length > 40 || 
      this.descripcion1.length > 70 || 
      this.descripcion2.length > 70 || 
      this.fechaNacimiento.length > 40 || 
      this.domicilio.length > 50 ||  
      this.urlFotoPerfil.length > 255 || 
      this.correoElectronico.length > 50) {
        this.errorValidation1 = false;
        this.errorValidation2 = true;
        return;
    }
    const { nombre, apellido, descripcion1, descripcion2, fechaNacimiento, domicilio, urlFotoPerfil, correoElectronico } = this;
    const modifValues:any= { nombre, apellido, descripcion1, descripcion2, fechaNacimiento, domicilio, urlFotoPerfil, correoElectronico };
    this.datosPortfolio.updateUser(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readUser().subscribe(data =>{
        this.myPortfolio=data;
        for (let user of this.myPortfolio) {
          if(user.urlFotoPerfil == null || user.urlFotoPerfil == ''){
            user.urlFotoPerfil = "/assets/NoPicture-500x500.jpg";
          }
        }
      });
    }, err => {
      alert("No se pudo modificar, verifique estado de sesión e ingreso como usuario administrador");
    });
    this.errorValidation1 = false;
    this.errorValidation2 = false;
    document.getElementById('closeButtonHeader')?.click();
  }

}
