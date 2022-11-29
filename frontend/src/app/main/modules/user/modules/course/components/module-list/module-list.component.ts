import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'src/app/main/models/modules';
import { ModuleService } from 'src/app/main/services/module/module.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  modules:Modules[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/module/thumbnail/";

  constructor(private route:ActivatedRoute, private moduleService:ModuleService) { }

  ngOnInit(): void {
    this.getAllModulesForCourse();
  }

  public getAllModulesForCourse(){
    const courseId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(courseId){
      this.moduleService.getAllModulesForCourse(courseId).subscribe({
        next:(response:Modules[])=>{
          this.modules = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }
}
