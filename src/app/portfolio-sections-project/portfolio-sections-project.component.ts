import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../servicios/portfolio.service';

@Component({
  selector: 'app-portfolio-sections-project',
  templateUrl: './portfolio-sections-project.component.html',
  styleUrls: ['./portfolio-sections-project.component.css']
})
export class PortfolioSectionsProjectComponent implements OnInit {

  myProjects:any;
  showAddProject:boolean = false;
  showModifyProject:boolean[] = [];

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos('/proyecto/').subscribe(data =>{
      this.myProjects=data;
    });

    for (let item of this.myProjects) {
      this.showModifyProject[item.id] = false;
    }
  }

  onDeleteProject(item: any) {
    console.log(item);
    this.datosPortfolio.deleteItemProject(item).subscribe(
      () => {
        this.myProjects = this.myProjects.filter( 
          (t:any) => {
            return t.id !== item.id;
          }
        );
      }
    );
  }

  onShowAddProject(){
    this.showAddProject = !this.showAddProject;
  }

  onShowModifyProject(item:any){
    this.showModifyProject[item] = !this.showModifyProject[item];
  }

}
