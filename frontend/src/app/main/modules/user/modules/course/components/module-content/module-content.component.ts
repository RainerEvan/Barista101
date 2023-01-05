import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contents } from 'src/app/main/models/contents';
import { Modules } from 'src/app/main/models/modules';
import { CompleteDialogComponent } from 'src/app/main/modules/shared/components/complete-dialog/complete-dialog.component';
import { EnrollmentService } from 'src/app/main/services/enrollment/enrollment.service';
import { ModuleService } from 'src/app/main/services/module/module.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module-content',
  templateUrl: './module-content.component.html',
  styleUrls: ['./module-content.component.css']
})
export class ModuleContentComponent implements OnInit {

  module:Modules;
  contents:Contents[] = [];
  currentContent:Contents;
  currentPage:number = 0;
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/content/thumbnail/";

  constructor(public dialog:Dialog, private route:ActivatedRoute, private moduleService:ModuleService, private enrollmentService:EnrollmentService) { }

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
          this.contents = this.module.contents;
          this.currentContent = this.contents[0];
          this.currentPage = 0;
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

  finishModule(){
    const enrollmentId = this.enrollmentService.currEnrollment;

    const formData = new FormData();

    formData.append('enrollmentId', new Blob([JSON.stringify(enrollmentId)], {type:"application/json"}));
    formData.append('moduleId', new Blob([JSON.stringify(this.module.id)], {type:"application/json"}));

    this.enrollmentService.finishModule(formData).subscribe({
      next:()=>{
        this.openCompleteDialog();
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  openCompleteDialog(){
    this.dialog.open(CompleteDialogComponent,{
      data:{
        title:this.module?.title,
        courseId:this.module?.course.id
      }
    });
  }

  nextPage(){
    this.currentPage += 1;
    this.currentContent = this.contents[this.currentPage];
    this.scrollToTop();
  }

  previousPage(){
    this.currentPage -= 1;
    this.currentContent = this.contents[this.currentPage];
    this.scrollToTop();
  }

  scrollToTop(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
