import { isNgTemplate } from '@angular/compiler';
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

  nombreCargados:string [] = [];
  apellidoCargados:string [] = [];
  descripcion1Cargados:string [] = [];
  descripcion2Cargados:string [] = [];
  fechaNacimientoCargados:string [] = [];
  domicilioCargados:string [] = [];
  urlFotoPerfilCargados:string [] = [];
  correoElectronicoCargados:string [] = [];

  constructor(private datosPortfolio:PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosPortfolio.readUser().subscribe(data =>{
      this.myPortfolio=data;
      this.load = true;
      for (let user of this.myPortfolio) {
        this.nombreCargados[user.id] = user.nombre; 
        this.apellidoCargados[user.id] = user.apellido; 
        this.descripcion1Cargados[user.id] = user.descripcion1; 
        this.descripcion2Cargados[user.id] = user.descripcion2; 
        this.fechaNacimientoCargados[user.id] = user.fechaNacimiento; 
        this.domicilioCargados[user.id] = user.domicilio; 
        this.urlFotoPerfilCargados[user.id] = user.urlFotoPerfil; 
        this.correoElectronicoCargados[user.id] = user.correoElectronico; 
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

  onSubmitModifyUser(item:any){
    if(this.nombreCargados[item.id].length === 0 || 
      this.apellidoCargados[item.id].length === 0 || 
      this.descripcion1Cargados[item.id].length === 0 || 
      this.fechaNacimientoCargados[item.id].length === 0 || 
      this.domicilioCargados[item.id].length === 0 ||   
      this.correoElectronicoCargados[item.id].length === 0) {
        this.errorValidation1 = true;
        this.errorValidation2 = false;
        return;
    }
    if(this.nombreCargados[item.id].length > 40 || 
      this.apellidoCargados[item.id].length > 40 || 
      this.descripcion1Cargados[item.id].length > 70 || 
      this.descripcion2Cargados[item.id].length > 70 || 
      this.fechaNacimientoCargados[item.id].length > 40 || 
      this.domicilioCargados[item.id].length > 50 ||  
      this.urlFotoPerfilCargados[item.id].length > 255 || 
      this.correoElectronicoCargados[item.id].length > 50) {
        this.errorValidation1 = false;
        this.errorValidation2 = true;
        return;
    }
    const nombre = this.nombreCargados[item.id];
    const apellido = this.apellidoCargados[item.id];
    const descripcion1 = this.descripcion1Cargados[item.id]; 
    const descripcion2 = this.descripcion2Cargados[item.id];
    const fechaNacimiento = this.fechaNacimientoCargados[item.id];
    const domicilio = this.domicilioCargados[item.id];
    const urlFotoPerfil = this.urlFotoPerfilCargados[item.id];
    const correoElectronico = this.correoElectronicoCargados[item.id];
    const modifValues:any= { nombre, apellido, descripcion1, descripcion2, fechaNacimiento, domicilio, urlFotoPerfil, correoElectronico };
    this.datosPortfolio.updateUser(item, modifValues).subscribe((response) => {
      this.datosPortfolio.readUser().subscribe(data =>{
        this.myPortfolio=data;
        for (let user of this.myPortfolio) {
          this.nombreCargados[user.id] = user.nombre; 
          this.apellidoCargados[user.id] = user.apellido; 
          this.descripcion1Cargados[user.id] = user.descripcion1; 
          this.descripcion2Cargados[user.id] = user.descripcion2; 
          this.fechaNacimientoCargados[user.id] = user.fechaNacimiento; 
          this.domicilioCargados[user.id] = user.domicilio; 
          this.urlFotoPerfilCargados[user.id] = user.urlFotoPerfil; 
          this.correoElectronicoCargados[user.id] = user.correoElectronico; 

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
