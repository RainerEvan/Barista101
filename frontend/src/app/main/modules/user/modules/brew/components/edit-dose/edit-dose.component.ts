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
  ratios:any;

  constructor(private brewService:BrewService, private formBuilder:FormBuilder) {
    this.ratios = Array.from({length:30}, (v,k)=>k+1);
  }

  ngOnInit(): void {
    this.generateDoseForm();
  }

  generateDoseForm(){
    this.doseForm = this.formBuilder.group({
      coffee: [15, [Validators.required, Validators.min(1), Validators.max(50)]],
      water: [225, [Validators.required, Validators.min(10), Validators.max(1500)]],
      ratio: [15, [Validators.required, Validators.min(1), Validators.max(30)]],
    });
  }

  increment(){
    if(this.cups + 1 <= 5){
      this.cups += 1;
      this.doseForm.controls['coffee'].setValue(this.doseForm.controls['coffee'].value + this.doseForm.controls['coffee'].value);
    }
  }

  decrement(){
    if(this.cups -1 > 0){
      this.doseForm.controls['coffee'].setValue(this.doseForm.controls['coffee'].value / this.cups);
      this.cups -= 1;
    }
  }

  editDose(){

  }
}
