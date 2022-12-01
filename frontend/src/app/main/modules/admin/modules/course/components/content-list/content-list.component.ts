import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contents } from 'src/app/main/models/contents';
import { ContentService } from 'src/app/main/services/content/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  contents:Contents[] = [];
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private contentService:ContentService) { }

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
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  delete(){
    
  }

}
