import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FalconeService } from 'src/app/services/falcone.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public result:string = '';
  public foundOnPlanet:string = ''

  constructor(public falconService:FalconeService, private router: Router) { 
    const navigation:any = this.router.getCurrentNavigation();
    if(navigation.id === 1){
      this.goBack()
    }
    const state = navigation.extras.state as {
    planet_name:string
    status: string
    };
    this.result = state.status;
    this.foundOnPlanet = state.planet_name;
    console.log(this.result)
  }

  ngOnInit(): void {}

  public goBack = () =>{
    this.router.navigate(['/home'])
  }
}
