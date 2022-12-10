import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumComments } from 'src/app/main/models/forumcomments';
import { ForumCommentService } from 'src/app/main/services/forum-comment/forum-comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments:ForumComments[] = [];
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profileImg/";

  constructor(private route:ActivatedRoute, private forumCommentService:ForumCommentService) { }

  ngOnInit(): void {
    this.getAllCommentsForForum();
  }

  public getAllCommentsForForum(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(forumId){
      this.forumCommentService.getAllCommentsForForum(forumId).subscribe({
        next:(response:ForumComments[])=>{
          this.comments = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

}
