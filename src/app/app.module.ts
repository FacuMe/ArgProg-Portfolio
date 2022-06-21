import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { PortfolioHeaderComponent } from './portfolio-header/portfolio-header.component';
import { PortfolioAboutComponent } from './portfolio-about/portfolio-about.component';
import { PortfolioSectionsComponent } from './portfolio-sections/portfolio-sections.component';

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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
