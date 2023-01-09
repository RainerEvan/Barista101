import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preparations',
  templateUrl: './preparations.component.html',
  styleUrls: ['./preparations.component.css']
})
export class PreparationsComponent implements OnInit {

  preparations:any

  constructor() { 
    this.preparations = [
      {
        item:"Ground Coffee 15 gr",
        status:true
      },
      {
        item:"Hand Grinder",
        status:false
      },
      {
        item:"Hario V60 Dripper",
        status:false
      }
    ]
  }

  ngOnInit(): void {
  }

  toggleCheck(preparation:any){
    preparation.status = !preparation.status;
  }
}
