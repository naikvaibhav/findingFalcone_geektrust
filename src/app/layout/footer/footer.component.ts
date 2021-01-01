import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public currentYear: number;

  constructor() { 
    this.currentYear = 0;
  }

  ngOnInit(): void {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }

}
