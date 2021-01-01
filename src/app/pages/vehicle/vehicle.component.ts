import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
//importing router service
import { Router, NavigationExtras } from "@angular/router";
//import service
import { FalconeService } from "../../services/falcone.service"
//import images
const vehicleImages = '../../../assets/images/vehicles';
const planetImages = '../../../assets/images/planets';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
 
  fieldArray: Array<number> = [0, 1, 2, 3];
  public getAllVehicles: any;
  public getAllPlanets: any;
  @ViewChildren("selectPlanet") public planetSelects!: QueryList<ElementRef<HTMLSelectElement>>;

  public totalTime: number = 0
  originalArray: any;
 
  
  constructor(public falconService: FalconeService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAllVehicles();
    this.getAllPlanets = this.falconService.getAllSelectedPlanets()
    if (this.getAllPlanets.length <= 0) {
      this.router.navigate(["/planet"]);
    }
  }

  public fetchAllVehicles = (): any => {
    this.falconService.getAllVehicles().subscribe(apiResponse => {
      this.originalArray = apiResponse;
      this.getAllVehicles = apiResponse
      let vehicleWithCountMoreThanOne = this.getAllVehicles.filter((vehicle: any) => {
        if (vehicle.total_no === 2) {
          return vehicle
        }
      })
      this.getAllVehicles.map((vehicle: any) => {
        return vehicle;
      })
      this.getAllVehicles = [...this.getAllVehicles, ...vehicleWithCountMoreThanOne]
    }, err => { console.log(err) })
  }

  public imagesPath = (index: string, type: string) => {
    let path;
    if (type === 'planet') {
      path = `${planetImages}/${index}.png`
    }
    if (type === 'vehicle') {
      path = `${vehicleImages}/${index}.png`
    }
    return path;
  }

  trackByMethod(index: number, el: any): any {
  }

  selectedPlanets = new Set<string>();

  public allSelectedPlanets: any;
  public allSelectedVehicles: any;

  public currentSelected: any = {}

  public selected = (e: any, vehicleName: string) => {
    const vehicleObj = this.originalArray.filter((vehicle: any) => {
      return vehicle.name === vehicleName
    })
    this.falconService.storeSelectedVehicle(vehicleObj[0].name)

    const planetObj = this.getAllPlanets.filter((planet: any) => {
      return planet.name === e.value
    })

    this.currentSelected = {
      'planetDistance': planetObj[0].distance,
      'speed': vehicleObj[0].speed
    }

    this.planetSelects.forEach((each:any) => {
      const selectedVal = each.nativeElement.value;
      if (selectedVal && selectedVal !== "undefined") {
        this.selectedPlanets.add(selectedVal);
        this.selectedPlanets.delete('Send to')
      }
    });
    this.allSelectedPlanets = this.falconService.getAllSelectedPlanets();
    this.allSelectedVehicles = this.falconService.getAllSelectedVehicles();
    this.updateTotalTimeToReachAlFalcone(this.currentSelected)
  }

  isSelected(planet: any) {
    return this.selectedPlanets.has(planet)
  }

  public updateTotalTimeToReachAlFalcone = (obj: any) => {
    this.totalTime = this.totalTime + (obj.planetDistance / obj.speed);
    return this.totalTime;
  }

  public initializeToken = () => {
    this.falconService.storeToken().subscribe((apiResponse: any) => {
      return apiResponse
    }, err => { console.log(err) })
  }

  public findFalcone = () => {
    let namesOfSelectedPlanets = this.allSelectedPlanets.map((e: any) => { return e.name })
    this.initializeToken()
    setTimeout(() => {
      this.falconService.findingFalcone(namesOfSelectedPlanets, this.allSelectedVehicles).subscribe((apiResponse: any) => {
        console.log(apiResponse)
        const navigationExtras: NavigationExtras = {
          state: {
            status: apiResponse.status,
            planet_name: apiResponse.status ? apiResponse.planet_name : ''
          }
        };
        this.router.navigate(["/result"],navigationExtras);
      }, err => { console.log(err) })
    }, 2000)
  }
}
