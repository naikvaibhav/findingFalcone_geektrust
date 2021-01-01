import { Injectable } from '@angular/core';
//http client
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
//importing rxjs
import { Observable, Subscriber } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { tap, map, filter } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class FalconeService {
  private baseUrl = `https://findfalcone.herokuapp.com`;
  public selectedPlanets:Array<object> = [];
  public selectedVehicles:Array<object> = [];
  constructor(private _http: HttpClient) { }

  public storeToken = ():Observable<any> => {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this._http.post(`${this.baseUrl}/token`,{}, {headers: headers}).pipe(tap((data:any)=>{
      let token =  data['token']
      localStorage.setItem("token", JSON.stringify(token));
    }))
  }

  public getAllPlanets = ():Observable<any> => {
    return this._http.get(`${this.baseUrl}/planets`)
  }

  public getAllVehicles = ():Observable<any> =>{
    return this._http.get(`${this.baseUrl}/vehicles`)
  }

  public storeSelectedPlanet = (planetSelected:any) =>{
    this.selectedPlanets.push(planetSelected)
  }
  public storeSelectedVehicle = (vehicleSelected:any) =>{
    this.selectedVehicles.push(vehicleSelected)
  }

  public getAllSelectedPlanets = () =>{
    return this.selectedPlanets;
  }
  public getAllSelectedVehicles = () =>{
    return this.selectedVehicles;
  }

  public getToken = () => {
    let p:any = localStorage.getItem("token");
    return JSON.parse(p);
  }

  public findingFalcone = (planets:any,vehicles:any) => {
    console.log(this.getToken())
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this._http.post(`${this.baseUrl}/find`,{'token':this.getToken(), 'planet_names':planets, 'vehicle_names': vehicles}, {headers: headers})
  }
}
