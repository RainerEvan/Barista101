import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contents } from 'src/app/main/models/contents';
import { Modules } from 'src/app/main/models/modules';
import { CompleteDialogComponent } from 'src/app/main/modules/shared/components/complete-dialog/complete-dialog.component';
import { ModuleService } from 'src/app/main/services/module/module.service';

@Component({
  selector: 'app-module-content',
  templateUrl: './module-content.component.html',
  styleUrls: ['./module-content.component.css']
})
export class ModuleContentComponent implements OnInit {

  module?:Modules;
  contents:Contents[] = [];
  currentContent?:Contents;
  currentPage:number = 0;
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute, private moduleService:ModuleService) { }

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

  finish(){
    const dialogRef = this.dialog.open(CompleteDialogComponent,{
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
