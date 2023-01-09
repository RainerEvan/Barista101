import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  steps:any;

  constructor() {
    this.steps = [
      {
        desc:"Pour 30 gr of water to bloom and try to stir",
        ms:0
      },
      {
        desc:"Wait for the coffee to bloom",
        ms:1000
      },
      {
        desc:"Pour another 140 gr of water",
        ms:3000
      },
    ]
  }

  ngOnInit(): void {
  }

}
