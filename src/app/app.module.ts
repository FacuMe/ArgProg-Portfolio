import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { PortfolioHeaderComponent } from './portfolio-header/portfolio-header.component';
import { PortfolioAboutComponent } from './portfolio-about/portfolio-about.component';
import { PortfolioSectionsExperienceComponent } from './portfolio-sections-experience/portfolio-sections-experience.component';
import { PortfolioSectionsEducationComponent } from './portfolio-sections-education/portfolio-sections-education.component';
import { PortfolioSectionsProjectComponent } from './portfolio-sections-project/portfolio-sections-project.component';
import { PortfolioSectionsSkillComponent } from './portfolio-sections-skill/portfolio-sections-skill.component';
import { PortfolioService } from './servicios/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorProvider } from './servicios/interceptor.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    LoginComponent,
    PortfolioHeaderComponent,
    PortfolioAboutComponent,
    PortfolioSectionsExperienceComponent,
    PortfolioSectionsEducationComponent,
    PortfolioSectionsProjectComponent,
    PortfolioSectionsSkillComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    PortfolioService,
    InterceptorProvider,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
