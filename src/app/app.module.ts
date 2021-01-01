import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importing formsModule
import { FormsModule } from "@angular/forms";
//importing HttpClientModule
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanetComponent } from './pages/planet/planet.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

//importing services
import { FalconeService } from "./services/falcone.service";
import { ResultComponent } from './pages/result/result.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PlanetComponent,
    VehicleComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [FalconeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
