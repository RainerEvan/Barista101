import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  isRunning:boolean = false;
  seconds:number = 0;
  totalTime:number = 90;
  timerId:any = 0;
  waterId:any = 0;
  steps:any;
  currStep:string = "Get Ready in 3..2..1..";
  totalWater:number = 0;
  gr:number = 0;
  mg:number = 0

  constructor() {
    this.steps = [
      {
        desc:"Pour 30 gr of water to bloom and stir gently",
        water:30,
        seconds:0,
        pour:true
      },
      {
        desc:"Wait for the coffee to bloom",
        water:0,
        seconds:13,
        pour:false
      },
      {
        desc:"Pour another 70 gr of water",
        water:70,
        seconds:30,
        pour:true
      },
      {
        desc:"Let all the water drain through",
        water:0,
        seconds:70,
        pour:false
      },
    ]
  }

  ngOnInit(): void {
    setTimeout(() => {
      // this.toggleTimer();
      this.currStep = this.steps[0].desc;
      this.totalWater = this.steps[0].water;
    },1000);
  }

  toggleTimer(){
    if (!this.isRunning && this.seconds != this.totalTime) {
      this.timerId = setInterval(() => {
        this.seconds++;

        this.steps.forEach((step) => {
          if(this.seconds == step.seconds){
            this.currStep = step.desc;
            this.totalWater += step.water;
            this.toggleWater(step.pour);
          }
        });

        if(this.seconds == this.totalTime){
          this.isRunning = !this.isRunning;
          clearInterval(this.timerId);
        }

      }, 1000);

      this.toggleWater(!this.isRunning);
    } else {
      clearInterval(this.timerId);
      clearInterval(this.waterId);
    }
    this.isRunning = !this.isRunning;
  }

  toggleWater(isPouring:boolean){
    if (isPouring) {
      this.waterId = setInterval(() => {
        this.mg++;

        if (this.mg % 100 == 0) {
          this.gr++;
          this.mg = 0;
        }
        if (this.gr == this.totalWater){
          isPouring = !isPouring;
          clearInterval(this.waterId);
        }
      }, 0.5);
    } else {
      clearInterval(this.waterId);
    }
  }

  // format(num: number) {
  //   return (num + '').length === 1 ? '0' + num : num + '';
  // }

  format(time: number){
    let minutes = (Math.floor(time / 60)).toString();

    if (minutes.length === 1){
      minutes = '0' + minutes;
    }
  
    let seconds = (time % 60).toString();
    
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
  
    return `${minutes}:${seconds}`;
  }
  
  formatProgress(){
    let rawTimeFraction = this.seconds / this.totalTime;
    // let progress = rawTimeFraction - (1 / this.totalTime) * (1 - rawTimeFraction);
    return (rawTimeFraction * 283).toFixed(0);
  }

}
