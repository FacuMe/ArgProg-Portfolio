import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

@Component({
  selector: 'app-portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.css']
})
export class PortfolioHeaderComponent implements OnInit {
  myPortfolio:any;
  showModifyHeader:boolean = false;

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos('/persona').subscribe(data =>{
      this.myPortfolio=data;
    });
  }

  onShowModifyHeader() {
    this.showModifyHeader = !this.showModifyHeader;
  }

}
