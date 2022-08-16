import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { PortfolioHeaderComponent } from './portfolio-header/portfolio-header.component';
import { PortfolioAboutComponent } from './portfolio-about/portfolio-about.component';
import { PortfolioSectionsComponent } from './portfolio-sections/portfolio-sections.component';
import { PortfolioService } from './servicios/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    LoginComponent,
    PortfolioHeaderComponent,
    PortfolioAboutComponent,
    PortfolioSectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule 
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
