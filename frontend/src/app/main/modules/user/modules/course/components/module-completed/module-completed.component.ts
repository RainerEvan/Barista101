import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modules } from 'src/app/main/models/modules';

@Component({
  selector: 'app-module-completed',
  templateUrl: './module-completed.component.html',
  styleUrls: ['./module-completed.component.css']
})
export class ModuleCompletedComponent implements OnInit {

  @Input("module") module?:Modules;
  title:string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(this.module){
      this.title = this.module.title;
    }
  }

  continue(){
    if(this.module){
      this.router.navigate(["./course/"+this.module.course.id]);
    }
  }
}
