import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contents } from 'src/app/main/models/contents';
import { ContentService } from 'src/app/main/services/content/content.service';

@Component({
  selector: 'app-module-content',
  templateUrl: './module-content.component.html',
  styleUrls: ['./module-content.component.css']
})
export class ModuleContentComponent implements OnInit {

  contents:Contents[] = [];
  currentContent?:Contents;
  currentPage:number = 0;
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private router:Router, private contentService:ContentService) { }

  ngOnInit(): void {
    this.getAllContentsForModule();
  }

  public getAllContentsForModule(){
    const moduleId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(moduleId){
      this.contentService.getAllContentsForModule(moduleId).subscribe({
        next:(response:Contents[])=>{
          this.contents = response;
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

  nextPage(){
    this.currentPage += 1;
    this.currentContent = this.contents[this.currentPage];
  }

  previousPage(){
    this.currentPage -= 1;
    this.currentContent = this.contents[this.currentPage];
  }

  finish(){
    const courseId = this.currentContent?.module.course.id;

    this.router.navigate(["./course/"+courseId]);
  }
}
