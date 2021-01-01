import { Component, OnInit } from '@angular/core';
//import service
import { FalconeService } from "../../services/falcone.service"
//import images
const planetImages = '../../../assets/images/planets';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  public getAllPlanets: any;
  public selectedPlanets: any;

  constructor(public falconService: FalconeService) {
    this.getAllPlanets;
    this.selectedPlanets;
  }

  ngOnInit(): void {
    this.fetchAllPlanets();
    this.selectedPlanets = this.falconService.getAllSelectedPlanets()
  }

  public fetchAllPlanets = (): any => {
    this.falconService.getAllPlanets().subscribe(apiResponse => {
      apiResponse.map((each: any) => {
        each.selected = false;
      })
      this.getAllPlanets = apiResponse
    }, err => { console.log(err) })
  }

  public imagesPath = (index: string) => {
    return `${planetImages}/${index}.png`
  }

  public removingSelectedPlanet = (planet: any) => {
    planet.selected = false;
    this.selectedPlanets = this.falconService.getAllSelectedPlanets()
    const removeIndex = this.selectedPlanets.map((planet: any) => {
      { return planet.name }
    }).indexOf(planet.name)
    this.selectedPlanets.splice(removeIndex, 1);
    this.selectedPlanets = this.falconService.getAllSelectedPlanets()
  }

  public addSelectedPlanet = (planet: any) => {
    if (this.selectedPlanets.length < 4) {
      planet.selected = true;
      this.falconService.storeSelectedPlanet(planet)
      this.selectedPlanets = this.falconService.getAllSelectedPlanets()
    }
  }

  public clickEventOnSelection = (planet: any, index: number) => {
    planet.selected ? this.removingSelectedPlanet(planet) : this.addSelectedPlanet(planet)
  }
}
