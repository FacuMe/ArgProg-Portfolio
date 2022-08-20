import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

@Component({
  selector: 'app-portfolio-sections-education',
  templateUrl: './portfolio-sections-education.component.html',
  styleUrls: ['./portfolio-sections-education.component.css']
})
export class PortfolioSectionsEducationComponent implements OnInit {

  myEducations:any;
  showAddEducation:boolean = false;
  showModifyEducation:boolean[] = [];

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos('/educacion/').subscribe(data =>{
      this.myEducations=data;
    });

    for (let item of this.myEducations) {
      this.showModifyEducation[item.id] = false;
    }

  }

  onDeleteEducation(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemEducation(item).subscribe(
      () => {
        this.myEducations = this.myEducations.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }

  onShowAddEducation(){
    this.showAddEducation = !this.showAddEducation;
  }

  onShowModifyEducation(item:any){
    this.showModifyEducation[item] = !this.showModifyEducation[item];
  }

}
