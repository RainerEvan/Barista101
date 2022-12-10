import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forums } from 'src/app/main/models/forums';
import { ForumService } from 'src/app/main/services/forum/forum.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  forum:Forums;
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profileImg/";

  constructor(private route:ActivatedRoute,private forumService:ForumService) { }

  ngOnInit(): void {
    this.getForum();
  }

  public getForum(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(forumId){
      this.forumService.getForum(forumId).subscribe({
        next:(response:Forums)=>{
          this.forum = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

}
