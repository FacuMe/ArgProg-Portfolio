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
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos('/persona').subscribe(data =>{
      this.myProfile=data.perfil;
    });
  }

  onShowModifyProfile(){
    this.showModifyProfile = !this.showModifyProfile;
  }

}
