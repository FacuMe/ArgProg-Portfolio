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


  nombre:string = "";
  apellido:string = "";
  descripcion1:string = "";
  descripcion2:string = "";
  fechaNacimiento:string = "";
  domicilio:string = "";
  urlFotoPerfil:string = "";
  urlFotoLogo:string = "";
  correoElectronico:string = "";

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosPortfolio.readUser().subscribe(data =>{
      this.myPortfolio=data;
      this.load = true;
    });
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  onShowModifyUser() {
    this.showModifyUser = !this.showModifyUser;
  }

  onSubmitModifyUser(item:any){
    if(this.nombre.length === 0 || 
      this.apellido.length === 0 || 
      this.descripcion1.length === 0 || 
      this.descripcion2.length === 0 || 
      this.fechaNacimiento.length === 0 || 
      this.domicilio.length === 0 ||  
      this.urlFotoPerfil.length === 0|| 
      this.urlFotoLogo.length === 0|| 
      this.correoElectronico.length === 0) {
      alert("Por favor completa todos los campos de la información personal");
      return;
    }
    if(this.nombre.length > 255 || 
      this.apellido.length > 255 || 
      this.descripcion1.length > 255 || 
      this.descripcion2.length > 255 || 
      this.fechaNacimiento.length > 255 || 
      this.domicilio.length > 255 ||  
      this.urlFotoPerfil.length > 255 || 
      this.urlFotoLogo.length > 255 || 
      this.correoElectronico.length > 255) {
      alert("Máximo 255 caracteres");
      return;
    }
    const { nombre, apellido, descripcion1, descripcion2, fechaNacimiento, domicilio, urlFotoPerfil, urlFotoLogo, correoElectronico } = this;
    const modifValues:any= { nombre, apellido, descripcion1, descripcion2, fechaNacimiento, domicilio, urlFotoPerfil, urlFotoLogo, correoElectronico };
    this.datosPortfolio.updateUser(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readUser().subscribe(data =>{
        this.myPortfolio=data;
      });
    });
  }

}
