import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  isRunning:boolean = false;
  mm:number = 0;
  ss:number = 0;
  ms:number = 0;
  timerId:any = 0;
  steps:any;
  currStep:string;

  constructor() {
    this.steps = [
      {
        desc:"Pour 30 gr of water to bloom right here next to it and try to stir",
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
    this.currStep = this.steps[0].desc;
  }

  toggleTimer(){
    if (!this.isRunning) {
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms % 100 == 0) {
          this.ss++;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0
        }
        this.steps.forEach((step) => {
          if(this.ms == step.ms){
            this.currStep = step.desc;
          }
        });
      }, 10);
    } else {
      clearInterval(this.timerId);
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
}
