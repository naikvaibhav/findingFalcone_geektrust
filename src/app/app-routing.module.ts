import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import components
import { HomeComponent } from "../app/pages/home/home.component";
import { PlanetComponent } from "../app/pages/planet/planet.component";
import { VehicleComponent } from "../app/pages/vehicle/vehicle.component";
import { ResultComponent } from "../app/pages/result/result.component";


const routes: Routes = [
  { path: "home", component: HomeComponent,pathMatch: "full" },
  { path: "planet", component: PlanetComponent,pathMatch: "full" },
  { path: "vehicle", component: VehicleComponent, pathMatch: "full"},
  { path: "result", component: ResultComponent, pathMatch: "full"},
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "*", component: HomeComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
