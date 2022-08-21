import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

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

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.readProfile().subscribe(data =>{
      this.myProfile=data;
      this.load = true;
    });
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
    });
  }

}
