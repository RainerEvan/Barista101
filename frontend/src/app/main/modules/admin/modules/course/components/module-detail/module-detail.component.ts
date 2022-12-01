import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'src/app/main/models/modules';
import { ModuleService } from 'src/app/main/services/module/module.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {

  module?:Modules;
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/module/thumbnail/";

  constructor(private route:ActivatedRoute,private moduleService:ModuleService) { }

  ngOnInit(): void {
    this.getModule();
  }

  public getModule(){
    const moduleId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(moduleId){
      this.moduleService.getModule(moduleId).subscribe({
        next:(response:Modules)=>{
          this.module = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

}
