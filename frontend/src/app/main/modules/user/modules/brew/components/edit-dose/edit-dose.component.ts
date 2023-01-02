import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-edit-dose',
  templateUrl: './edit-dose.component.html',
  styleUrls: ['./edit-dose.component.css']
})
export class EditDoseComponent implements OnInit {

  doseForm:FormGroup;
  loading:boolean = false;
  isDoseFormSubmitted:boolean = false;
  cups:number = 1;
  coffeeVal:number;
  waterVal:number;
  ratios:any;
  time:number = 0;
  grindSizes:any;

  constructor(private brewService:BrewService, private formBuilder:FormBuilder) {
    this.ratios = Array.from({length:30}, (v,k)=>k+1);

    this.grindSizes = [
      {
        name:"Coarse",
        description:"French Press, Cold Brew",
        value:"coarse"
      },
      {
        name:"Medium",
        description:"Pour Over, Machine Drip, Siphon",
        value:"medium"
      },
      {
        name:"Fine",
        description:"Moka Pot, Espresso",
        value:"fine"
      },
    ]
  }

  ngOnInit(): void {
    this.generateDoseForm();
    this.coffeeVal = 15;
    this.waterVal = 225;
    this.time = this.coffeeVal * 10000;
  }

  generateDoseForm(){
    this.doseForm = this.formBuilder.group({
      coffee: [15, [Validators.required, Validators.min(1)]],
      water: [225, [Validators.required, Validators.min(1)]],
      ratio: [15, [Validators.required, Validators.min(1)]],
      grindSize: ["medium", [Validators.required]],
    });
  }

  get coffee(){
    return this.doseForm.get('coffee');
  }
  get water(){
    return this.doseForm.get('water');
  }
  get ratio(){
    return this.doseForm.get('ratio');
  }

  increment(){
    if(this.cups + 1 <= 5){
      this.cups += 1;
      this.coffee.setValue(this.coffee.value + this.coffeeVal);
      this.water.setValue(this.water.value + this.waterVal);
    }
  }

  decrement(){
    if(this.cups - 1 > 0){
      this.coffee.setValue(this.coffee.value - this.coffeeVal);
      this.water.setValue(this.water.value - this.waterVal);
      this.cups -= 1;
    }
  }

  onChangeCoffee(event:any){
    const coffee = event.target.value;

    if(coffee > 0){
      this.coffeeVal = coffee;
      this.water.setValue(coffee * this.ratio.value);
    }
  }

  onChangeWater(event:any){
    const water = event.target.value;

    if(water > 0){
      this.waterVal = water;
      this.ratio.setValue(Math.floor(water / this.coffee.value));
    }
  }

  onChangeRatio(event:any){
    const ratio = event.target.value;

    if(ratio > 0){
      this.waterVal = this.ratio.value * this.coffee.value
      this.water.setValue(this.waterVal);
    }
  }

  editDose(){

  }
}
