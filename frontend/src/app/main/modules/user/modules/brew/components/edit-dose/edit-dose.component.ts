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

  constructor(private brewService:BrewService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.generateDoseForm();
  }

  generateDoseForm(){
    this.doseForm = this.formBuilder.group({
      coffee: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      ratio: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
    });
  }

  increment(name:string, max:number, step:number){
    const control = this.doseForm.controls[name];

    if(control.value + step <= max){
      control.setValue(control.value + step);
    }
  }

  decrement(name:string, step:number){
    const control = this.doseForm.controls[name];

    if(control.value - step > 0){
      control.setValue(control.value - step);
    }
  }

  editDose(){

  }
}
